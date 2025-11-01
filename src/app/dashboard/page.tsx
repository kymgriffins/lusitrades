import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getChannelInfo, getChannelVideos, formatNumber, formatPublishedDate, YouTubeChannel, YouTubeVideo } from "@/lib/youtube/service";
import { Activity, Eye, Play, Users, Youtube } from "lucide-react";

export default async function DashboardPage() {
  let channelInfo: YouTubeChannel | null = null;
  let latestVideos: YouTubeVideo[] = [];
  let error: string | null = null;

  try {
    // Fetch channel info
    channelInfo = await getChannelInfo();

    // Fetch latest videos using the channel ID if we have it
    if (channelInfo?.id) {
      const allVideos = await getChannelVideos(channelInfo.id, 3);
      latestVideos = allVideos.slice(0, 3);
    }
  } catch (err) {
    error = err instanceof Error ? err.message : 'Failed to load data';
    console.error('Error fetching data:', err);
  }

  if (error) {
    return (
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <p className="text-red-500 mb-2">Error loading data</p>
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
          <h1 className="text-3xl font-bold text-foreground">{channelInfo?.title || 'Lorde Merchant'}</h1>
          <p className="text-muted-foreground">
            Professional YouTube Portfolio & Trading Insights
          </p>
        </div>
        <Button>
          <Youtube className="w-4 h-4 mr-2" />
          Subscribe
        </Button>
      </div>

      {/* YouTube Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Subscribers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNumber(channelInfo?.subscriberCount || '0')}</div>
            <p className="text-xs text-muted-foreground">
              Growing community
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNumber(channelInfo?.viewCount || '0')}</div>
            <p className="text-xs text-muted-foreground">
              Content reach
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Videos</CardTitle>
            <Play className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{channelInfo?.videoCount || '0'}</div>
            <p className="text-xs text-muted-foreground">
              Educational content
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Channel Age</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {channelInfo?.publishedAt ? new Date(channelInfo.publishedAt).getFullYear() : '2024'}
            </div>
            <p className="text-xs text-muted-foreground">
              Year started
            </p>
          </CardContent>
        </Card>
      </div>
      {/* Featured Content */}
      <Card>
        <CardHeader>
          <CardTitle>About {channelInfo?.title || 'Lorde Merchant'}</CardTitle>
          <CardDescription>
            Professional trader and market analyst sharing insights and strategies
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-start space-x-4">
            <Avatar className="w-16 h-16">
              <AvatarImage src={channelInfo?.thumbnail} alt={channelInfo?.title} />
              <AvatarFallback>LM</AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-2">
              <p className="text-sm text-muted-foreground">
                {channelInfo?.description || 'Experienced trader with deep knowledge in financial markets. Specializing in technical analysis, risk management, and educational content for aspiring traders. Focus on data-driven strategies and market psychology.'}
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">Technical Analysis</Badge>
                <Badge variant="outline">Risk Management</Badge>
                <Badge variant="outline">Market Psychology</Badge>
                <Badge variant="outline">Educational Content</Badge>
                <Badge variant="outline">Trading Strategies</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      {/* Main Content */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Channel Growth</CardTitle>
            <CardDescription>
              Subscriber growth and engagement metrics over time
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[200px] flex items-center justify-center text-muted-foreground">
              YouTube Analytics Chart would go here
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Latest Videos</CardTitle>
            <CardDescription>
              Most recent content and performance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {latestVideos.map((video) => (
                <div key={video.id} className="flex items-center space-x-4">
                  <div className="w-16 h-12 bg-muted rounded flex items-center justify-center">
                    <Play className="w-6 h-6 text-muted-foreground" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none line-clamp-2">
                      {video.title}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {formatNumber(video.viewCount)} views • {formatPublishedDate(video.publishedAt)}
                    </p>
                  </div>
                  <Badge variant="secondary">New</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>


    </div>
  );
}
