import { NextRequest, NextResponse } from 'next/server';
import { getChannelVideos } from '@/lib/youtube/service';
import { siteConfig } from '@/lib/config';

export async function GET(request: NextRequest) {
  try {
    console.log('Videos API called');
    const { searchParams } = new URL(request.url);
    const channelId = searchParams.get('channelId') || siteConfig.youtube.channelHandle;
    const maxResults = parseInt(searchParams.get('maxResults') || '50');
    console.log('Channel ID:', channelId, 'Max results:', maxResults);

    const videos = await getChannelVideos(channelId, maxResults);
    console.log('Videos fetched:', videos.length);

    return NextResponse.json(videos);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch videos' },
      { status: 500 }
    );
  }
}
