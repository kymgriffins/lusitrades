import { NextRequest, NextResponse } from 'next/server';
import { getChannelInfo } from '@/lib/youtube/service';

export async function GET(request: NextRequest) {
  try {
    console.log('Channel API called');
    const { searchParams } = new URL(request.url);
    const channelId = searchParams.get('channelId') || 'UC-lordeofmerchants001';
    console.log('Channel ID:', channelId);

    const channelInfo = await getChannelInfo(channelId);
    console.log('Channel info result:', channelInfo);

    if (!channelInfo) {
      console.log('Channel not found');
      return NextResponse.json(
        { error: 'Channel not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(channelInfo);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch channel information' },
      { status: 500 }
    );
  }
}
