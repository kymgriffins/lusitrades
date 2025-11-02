import { NextRequest, NextResponse } from 'next/server';
import { getChannelInfo, getChannelVideos } from '@/lib/youtube/service';
import { siteConfig } from '@/lib/config';

interface AnalyticsData {
  overview: {
    totalViews: string;
    totalSubscribers: string;
    totalVideos: number;
    avgEngagement: string;
    viewsChange: string;
    subscribersChange: string;
    videosChange: string;
    engagementChange: string;
  };
  topVideos: Array<{
    title: string;
    views: string;
    likes: string;
    comments: string;
    duration: string;
  }>;
  audience: {
    topCountries: Array<{
      country: string;
      percentage: number;
    }>;
    ageGroups: Array<{
      age: string;
      percentage: number;
    }>;
    gender: {
      male: number;
      female: number;
    };
  };
}

// Calculate upload streak (consecutive days with uploads)
function calculateUploadStreak(videos: any[]): number {
  if (videos.length === 0) return 0;

  // Sort videos by publish date (newest first)
  const sortedVideos = videos.sort((a, b) =>
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  let streak = 0;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Check consecutive days starting from today backwards
  for (let i = 0; i < sortedVideos.length; i++) {
    const videoDate = new Date(sortedVideos[i].publishedAt);
    videoDate.setHours(0, 0, 0, 0);

    const daysDiff = Math.floor((today.getTime() - videoDate.getTime()) / (1000 * 60 * 60 * 24));

    if (daysDiff === streak) {
      streak++;
    } else if (daysDiff > streak) {
      break; // Gap in uploads
    }
  }

  return streak;
}

// Calculate engagement rate (likes + comments) / views * 100
function calculateEngagementRate(video: any): number {
  const views = parseInt(video.viewCount) || 1;
  const likes = parseInt(video.likeCount) || 0;
  const comments = parseInt(video.commentCount) || 0;
  return ((likes + comments) / views) * 100;
}

export async function GET(request: NextRequest) {
  try {
    console.log('Analytics API called');
    const { searchParams } = new URL(request.url);
    const channelId = searchParams.get('channelId') || siteConfig.youtube.channelHandle;
    const period = searchParams.get('period') || '30days'; // 7days, 30days, 90days, 1year

    console.log('Channel ID:', channelId, 'Period:', period);

    // Fetch channel info and videos
    const [channelInfo, videos] = await Promise.all([
      getChannelInfo(channelId),
      getChannelVideos(channelId, 50) // Get more videos for better analytics
    ]);

    if (!channelInfo) {
      return NextResponse.json(
        { error: 'Channel not found' },
        { status: 404 }
      );
    }

    // Calculate analytics data
    const totalViews = channelInfo.viewCount;
    const totalSubscribers = channelInfo.subscriberCount;
    const totalVideos = parseInt(channelInfo.videoCount);

    // Filter videos by period
    const now = new Date();
    let periodStart: Date;

    switch (period) {
      case '7days':
        periodStart = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case '30days':
        periodStart = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        break;
      case '90days':
        periodStart = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
        break;
      case '1year':
        periodStart = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
        break;
      default:
        periodStart = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    }

    const periodVideos = videos.filter(video =>
      new Date(video.publishedAt) >= periodStart
    );

    // Calculate average engagement
    const avgEngagement = periodVideos.length > 0
      ? (periodVideos.reduce((sum, video) => sum + calculateEngagementRate(video), 0) / periodVideos.length).toFixed(1)
      : '0.0';

    // Calculate upload streak
    const uploadStreak = calculateUploadStreak(videos);

    // Get top performing videos (by views)
    const topVideos = videos
      .sort((a, b) => parseInt(b.viewCount) - parseInt(a.viewCount))
      .slice(0, 5)
      .map(video => ({
        title: video.title,
        views: video.viewCount,
        likes: video.likeCount,
        comments: video.commentCount,
        duration: video.duration,
      }));

    // Mock audience data (YouTube Analytics API would be needed for real data)
    const audience = {
      topCountries: [
        { country: "United States", percentage: 34.2 },
        { country: "United Kingdom", percentage: 18.7 },
        { country: "Canada", percentage: 12.3 },
        { country: "Australia", percentage: 8.9 },
        { country: "Germany", percentage: 6.8 }
      ],
      ageGroups: [
        { age: "25-34", percentage: 42.1 },
        { age: "35-44", percentage: 28.3 },
        { age: "18-24", percentage: 15.7 },
        { age: "45-54", percentage: 9.2 },
        { age: "55+", percentage: 4.7 }
      ],
      gender: {
        male: 68.4,
        female: 31.6
      }
    };

    // Calculate changes (mock data for now - would need historical data)
    const analyticsData: AnalyticsData = {
      overview: {
        totalViews,
        totalSubscribers,
        totalVideos,
        avgEngagement: `${avgEngagement}%`,
        viewsChange: "+18.3%", // Mock
        subscribersChange: "+12.5%", // Mock
        videosChange: `+${uploadStreak}`, // Use upload streak as video change indicator
        engagementChange: "+2.1%" // Mock
      },
      topVideos,
      audience
    };

    console.log('Analytics data calculated:', {
      totalViews,
      totalSubscribers,
      totalVideos,
      avgEngagement,
      uploadStreak,
      topVideosCount: topVideos.length
    });

    return NextResponse.json(analyticsData);
  } catch (error) {
    console.error('Analytics API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch analytics data' },
      { status: 500 }
    );
  }
}
