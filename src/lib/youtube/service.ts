import { google } from 'googleapis';
import { siteConfig } from '../config';

const youtube = google.youtube({
  version: 'v3',
  auth: process.env.YOUTUBE_API_KEY,
});

export interface YouTubeChannel {
  id: string;
  title: string;
  description: string;
  subscriberCount: string;
  videoCount: string;
  viewCount: string;
  publishedAt: string;
  thumbnail: string;
  banner: string;
}

export interface YouTubeVideo {
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

export interface ChannelStats {
  subscriberCount: string;
  videoCount: string;
  viewCount: string;
}

// Get channel information
export async function getChannelInfo(channelId: string = siteConfig.youtube.channelHandle): Promise<YouTubeChannel | null> {
  try {
    console.log('Fetching channel info for:', channelId);

    let response;

    // If it's a handle (starts with @), use forHandle parameter
    if (channelId.startsWith('@')) {
      response = await youtube.channels.list({
        part: ['snippet', 'statistics'],
        forHandle: channelId.substring(1), // Remove the @ symbol
      });
    } else {
      // Use regular channel ID
      response = await youtube.channels.list({
        part: ['snippet', 'statistics'],
        id: [channelId],
      });
    }

    console.log('Channel API response:', response.data);

    if (!response.data.items || response.data.items.length === 0) {
      console.log('No channel found');
      return null;
    }

    const channel = response.data.items[0];
    const snippet = channel.snippet!;
    const statistics = channel.statistics!;

    const channelInfo = {
      id: channel.id!,
      title: snippet.title || '',
      description: snippet.description || '',
      subscriberCount: statistics.subscriberCount || '0',
      videoCount: statistics.videoCount || '0',
      viewCount: statistics.viewCount || '0',
      publishedAt: snippet.publishedAt || '',
      thumbnail: snippet.thumbnails?.high?.url || '',
      banner: snippet.thumbnails?.default?.url || '',
    };

    console.log('Channel info processed:', channelInfo);
    return channelInfo;
  } catch (error) {
    console.error('Error fetching channel info:', error);
    return null;
  }
}

// Get channel videos
export async function getChannelVideos(channelId: string = siteConfig.youtube.channelHandle, maxResults: number = 50): Promise<YouTubeVideo[]> {
  try {
    console.log('Fetching videos for channel:', channelId);

    // First, get the channel info to get the actual channel ID
    const channelInfo = await getChannelInfo(channelId);
    if (!channelInfo) {
      console.log('Could not get channel info for videos');
      return [];
    }

    console.log('Using channel ID for videos:', channelInfo.id);

    // Now get the content details using the actual channel ID
    const channelResponse = await youtube.channels.list({
      part: ['contentDetails'],
      id: [channelInfo.id],
    });

    if (!channelResponse.data.items || channelResponse.data.items.length === 0) {
      return [];
    }

    const uploadPlaylistId = channelResponse.data.items[0].contentDetails?.relatedPlaylists?.uploads;

    if (!uploadPlaylistId) {
      return [];
    }

    // Get videos from the upload playlist
    console.log('Fetching playlist items for:', uploadPlaylistId);
    const playlistResponse = await youtube.playlistItems.list({
      part: ['snippet', 'contentDetails'],
      playlistId: uploadPlaylistId,
      maxResults,
    });

    console.log('Playlist response items:', playlistResponse.data.items?.length || 0);

    if (!playlistResponse.data.items) {
      console.log('No playlist items found');
      return [];
    }

    const videoIds = playlistResponse.data.items.map(item => item.contentDetails?.videoId).filter(Boolean) as string[];
    console.log('Video IDs found:', videoIds.length);

    // Get detailed video information
    const videoResponse = await youtube.videos.list({
      part: ['snippet', 'statistics', 'contentDetails'],
      id: videoIds,
    });

    if (!videoResponse.data.items) {
      return [];
    }

    return videoResponse.data.items.map(video => {
      const snippet = video.snippet!;
      const statistics = video.statistics!;
      const contentDetails = video.contentDetails!;

      return {
        id: video.id!,
        title: snippet.title || '',
        description: snippet.description || '',
        thumbnail: snippet.thumbnails?.high?.url || '',
        publishedAt: snippet.publishedAt || '',
        duration: contentDetails.duration || '',
        viewCount: statistics.viewCount || '0',
        likeCount: statistics.likeCount || '0',
        commentCount: statistics.commentCount || '0',
        tags: snippet.tags || [],
      };
    });
  } catch (error) {
    console.error('Error fetching channel videos:', error);
    return [];
  }
}

// Get channel statistics
export async function getChannelStats(channelId: string = 'UC-lordeofmerchants001'): Promise<ChannelStats | null> {
  try {
    const response = await youtube.channels.list({
      part: ['statistics'],
      id: [channelId],
    });

    if (!response.data.items || response.data.items.length === 0) {
      return null;
    }

    const statistics = response.data.items[0].statistics!;

    return {
      subscriberCount: statistics.subscriberCount || '0',
      videoCount: statistics.videoCount || '0',
      viewCount: statistics.viewCount || '0',
    };
  } catch (error) {
    console.error('Error fetching channel stats:', error);
    return null;
  }
}

// Format duration from ISO 8601 to readable format
export function formatDuration(duration: string): string {
  const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);

  if (!match) return '0:00';

  const hours = (match[1] || '').replace('H', '');
  const minutes = (match[2] || '').replace('M', '');
  const seconds = (match[3] || '').replace('S', '');

  const h = hours ? parseInt(hours) : 0;
  const m = minutes ? parseInt(minutes) : 0;
  const s = seconds ? parseInt(seconds) : 0;

  if (h > 0) {
    return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  } else {
    return `${m}:${s.toString().padStart(2, '0')}`;
  }
}

// Format numbers with K/M suffixes
export function formatNumber(num: string): string {
  const number = parseInt(num);
  if (number >= 1000000) {
    return (number / 1000000).toFixed(1) + 'M';
  } else if (number >= 1000) {
    return (number / 1000).toFixed(1) + 'K';
  }
  return number.toString();
}

// Format published date to relative time
export function formatPublishedDate(dateString: string): string {
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
