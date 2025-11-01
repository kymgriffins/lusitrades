import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { siteConfig } from "@/lib/config";

export default function AboutPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">About {siteConfig.branding.name}</h1>
        <p className="text-muted-foreground">
          Learn more about the creator and their journey in financial markets
        </p>
      </div>

      {/* Creator Profile */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src="/placeholder-avatar.jpg" alt={siteConfig.profile.displayName} />
              <AvatarFallback>{siteConfig.profile.displayName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-2xl">{siteConfig.profile.displayName}</CardTitle>
              <CardDescription className="text-base">{siteConfig.profile.location}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground leading-relaxed mb-4">
            {siteConfig.profile.bio}
          </p>

          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Expertise Areas</h3>
              <div className="flex flex-wrap gap-2">
                {siteConfig.profile.expertise.map((skill, index) => (
                  <Badge key={index} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Channel Focus</h3>
              <p className="text-sm text-muted-foreground">
                {siteConfig.branding.description}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Channel Statistics */}
      <Card>
        <CardHeader>
          <CardTitle>Channel Overview</CardTitle>
          <CardDescription>
            Key metrics and achievements
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">101</div>
              <div className="text-sm text-muted-foreground">Videos Published</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">35</div>
              <div className="text-sm text-muted-foreground">Subscribers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">6.8K</div>
              <div className="text-sm text-muted-foreground">Total Views</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Content Categories */}
      <Card>
        <CardHeader>
          <CardTitle>Content Categories</CardTitle>
          <CardDescription>
            Types of content you can expect to find
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium">Educational Content</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Technical Analysis Tutorials</li>
                <li>• Risk Management Strategies</li>
                <li>• Market Psychology Insights</li>
                <li>• Trading Fundamentals</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Market Analysis</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Real-time Market Analysis</li>
                <li>• Trading Opportunities</li>
                <li>• Economic Indicators</li>
                <li>• Price Action Studies</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Mission Statement */}
      <Card>
        <CardHeader>
          <CardTitle>Mission & Vision</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Our Mission</h4>
              <p className="text-muted-foreground">
                To empower aspiring traders with comprehensive knowledge, practical strategies,
                and real-world insights to navigate the complex world of financial markets with confidence.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-2">Our Vision</h4>
              <p className="text-muted-foreground">
                To build a community of informed, disciplined traders who approach financial markets
                with the right mindset, tools, and strategies for long-term success.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact/Social Links */}
      <Card>
        <CardHeader>
          <CardTitle>Connect & Follow</CardTitle>
          <CardDescription>
            Stay updated with the latest content and insights
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <a
              href={siteConfig.social.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-primary hover:underline"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
              <span>YouTube Channel</span>
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
