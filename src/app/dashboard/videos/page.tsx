"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Play, Eye, ThumbsUp, Calendar, Search, Filter, Loader2 } from "lucide-react";
import VideoPlayer from "@/components/video-player";
import { formatDuration } from "@/lib/utils";

interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  publishedAt: string;
  duration: string;
  viewCount: string;
  likeCount: string;
  commentCount: string;
  tags: string[];
}

const categories = ["All", "This Month", "Last Month", "2 Months Ago", "3 Months Ago", "Strategy", "Analysis", "Education", "Crypto", "Options", "Psychology"];

// Utility functions
function formatNumber(num: string): string {
  const number = parseInt(num);
  if (number >= 1000000) {
    return (number / 1000000).toFixed(1) + 'M';
  } else if (number >= 1000) {
    return (number / 1000).toFixed(1) + 'K';
  }
  return number.toString();
}

function formatPublishedDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInDays === 0) {
    return 'today';
  } else if (diffInDays === 1) {
    return '1 day ago';
  } else if (diffInDays < 7) {
    return `${diffInDays} days ago`;
  } else if (diffInDays < 30) {
    const weeks = Math.floor(diffInDays / 7);
    return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
  } else if (diffInDays < 365) {
    const months = Math.floor(diffInDays / 30);
    return `${months} month${months > 1 ? 's' : ''} ago`;
  } else {
    const years = Math.floor(diffInDays / 365);
    return `${years} year${years > 1 ? 's' : ''} ago`;
  }
}

export default function VideosPage() {
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [filteredVideos, setFilteredVideos] = useState<YouTubeVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [playingVideo, setPlayingVideo] = useState<{ id: string; title: string } | null>(null);

  const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes for videos

  useEffect(() => {
    const fetchVideos = async () => {
      const cacheKey = 'videos_data';
      const now = Date.now();

      // Always fetch fresh data for now to debug
      localStorage.removeItem(cacheKey);
      localStorage.removeItem(`${cacheKey}_time`);

      try {
        setLoading(true);
        console.log('Fetching videos from API...');
        const response = await fetch('/api/youtube/videos?maxResults=50');
        if (!response.ok) {
          throw new Error('Failed to fetch videos');
        }
        const videoData = await response.json();
        console.log('Videos loaded:', videoData.length);

        // Cache the data
        localStorage.setItem(cacheKey, JSON.stringify(videoData));
        localStorage.setItem(`${cacheKey}_time`, now.toString());

        setVideos(videoData);
        setFilteredVideos(videoData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load videos');
        console.error('Error fetching videos:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  useEffect(() => {
    let filtered = videos;

    // Filter by category
    if (selectedCategory !== "All") {
      // Check if it's a monthly filter
      const monthlyFilters = ["This Month", "Last Month", "2 Months Ago", "3 Months Ago"];
      if (monthlyFilters.includes(selectedCategory)) {
        const now = new Date();
        let targetMonth: number;
        let targetYear: number;

        switch (selectedCategory) {
          case "This Month":
            targetMonth = now.getMonth();
            targetYear = now.getFullYear();
            break;
          case "Last Month":
            const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1);
            targetMonth = lastMonth.getMonth();
            targetYear = lastMonth.getFullYear();
            break;
          case "2 Months Ago":
            const twoMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 2);
            targetMonth = twoMonthsAgo.getMonth();
            targetYear = twoMonthsAgo.getFullYear();
            break;
          case "3 Months Ago":
            const threeMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 3);
            targetMonth = threeMonthsAgo.getMonth();
            targetYear = threeMonthsAgo.getFullYear();
            break;
          default:
            targetMonth = now.getMonth();
            targetYear = now.getFullYear();
        }

        filtered = filtered.filter(video => {
          const videoDate = new Date(video.publishedAt);
          return videoDate.getMonth() === targetMonth && videoDate.getFullYear() === targetYear;
        });
      } else {
        // Filter by content tags
        filtered = filtered.filter(video =>
          video.tags.some((tag: string) =>
            tag.toLowerCase().includes(selectedCategory.toLowerCase())
          )
        );
      }
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(video =>
        video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        video.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredVideos(filtered);
  }, [videos, selectedCategory, searchQuery]);

  const handlePlayVideo = (videoId: string, title: string) => {
    setPlayingVideo({ id: videoId, title });
  };

  const handleClosePlayer = () => {
    setPlayingVideo(null);
  };

  if (loading) {
    return (
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="w-8 h-8 animate-spin" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <p className="text-red-500 mb-2">Error loading videos</p>
            <p className="text-sm text-muted-foreground">{error}</p>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Video Library</h1>
          <p className="text-muted-foreground">
            Explore Trading Insights and Educational Content
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search videos..."
              className="pl-10 w-64"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            size="sm"
            className="rounded-full"
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Videos Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredVideos.map((video) => (
          <Card key={video.id} className="group hover:shadow-lg transition-shadow duration-200">
            <CardHeader className="p-0">
              <div className="relative">
                <img
                  src={`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`}
                  alt={video.title}
                  className="w-full aspect-video object-cover rounded-t-lg"
                  onError={(e) => {
                    // Fallback to different thumbnail qualities
                    if (e.currentTarget.src.includes('maxresdefault')) {
                      e.currentTarget.src = `https://img.youtube.com/vi/${video.id}/hqdefault.jpg`;
                    } else if (e.currentTarget.src.includes('hqdefault')) {
                      e.currentTarget.src = `https://img.youtube.com/vi/${video.id}/mqdefault.jpg`;
                    } else if (e.currentTarget.src.includes('mqdefault')) {
                      e.currentTarget.src = `https://img.youtube.com/vi/${video.id}/default.jpg`;
                    } else {
                      e.currentTarget.src = `https://via.placeholder.com/480x360/374151/9CA3AF?text=${encodeURIComponent(video.title.substring(0, 20))}`;
                    }
                  }}
                />
                <div className="absolute inset-0 bg-black/20 rounded-t-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                  <Button size="lg" className="rounded-full" onClick={() => handlePlayVideo(video.id, video.title)}>
                    <Play className="w-6 h-6 ml-1" />
                  </Button>
                </div>
                <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                  {formatDuration(video.duration)}
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-2">
                <h3 className="font-semibold text-lg leading-tight line-clamp-2">
                  {video.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {video.description}
                </p>

                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Eye className="w-4 h-4" />
                      <span>{formatNumber(video.viewCount)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <ThumbsUp className="w-4 h-4" />
                      <span>{formatNumber(video.likeCount)}</span>
                    </div>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    Trading
                  </Badge>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                    <Calendar className="w-3 h-3" />
                    <span>{formatPublishedDate(video.publishedAt)}</span>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handlePlayVideo(video.id, video.title)}
                  >
                    Watch Now
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Load More */}
      <div className="flex justify-center">
        <Button variant="outline" size="lg">
          Load More Videos
        </Button>
      </div>

      {/* Video Player Modal */}
      {playingVideo && (
        <VideoPlayer
          videoId={playingVideo.id}
          title={playingVideo.title}
          isOpen={true}
          onClose={handleClosePlayer}
        />
      )}
    </div>
  );
}
