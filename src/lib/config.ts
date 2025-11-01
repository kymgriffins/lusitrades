// Configuration for lusitrades YouTube portfolio
export const siteConfig = {
  // YouTube Channel Configuration
  youtube: {
    channelHandle: '@lusitrades', // YouTube handle (with @)
    channelId: 'UCKi8mY-980b20GSvGoCHF4A', // YouTube channel ID (fetched automatically)
  },

  // Site Branding
  branding: {
    name: 'Lusi Trades',
    title: 'Lusi Trades - YouTube Portfolio',
    description: 'Professional YouTube portfolio showcasing trading insights, market analysis, and educational content',
    tagline: 'Professional trading insights and market analysis',
    keywords: ['youtube', 'trading', 'portfolio', 'market analysis', 'financial education'],
  },

  // Content Creator Profile
  profile: {
    displayName: 'Lusi Trades',
    bio: 'Experienced trader and market analyst with deep knowledge in financial markets. Specializing in technical analysis, risk management, and educational content for aspiring traders. Focus on data-driven strategies and market psychology.',
    expertise: [
      'Technical Analysis',
      'Risk Management',
      'Market Psychology',
      'Educational Content',
      'Trading Strategies',
      'Financial Markets'
    ],
    location: 'Financial Markets • Trading Education',
  },

  // Navigation
  navigation: {
    items: [
      { href: '/dashboard', label: 'Portfolio', icon: 'Home' },
      { href: '/dashboard/videos', label: 'Videos', icon: 'Package' },
      { href: '/dashboard/analytics', label: 'Analytics', icon: 'BarChart3' },
      { href: '/dashboard/about', label: 'About', icon: 'Settings' }
    ]
  },

  // Theme Configuration
  theme: {
    defaultTheme: 'dark',
    enableSystem: true,
  },

  // API Configuration
  api: {
    cacheDuration: 10 * 60 * 1000, // 10 minutes
    analyticsCacheDuration: 5 * 60 * 1000, // 5 minutes
  },

  // Social Links (optional)
  social: {
    youtube: 'https://youtube.com/@lusitrades',
    // Add other social links as needed
  }
};

// Type definitions for better TypeScript support
export type SiteConfig = typeof siteConfig;
export type YouTubeConfig = typeof siteConfig.youtube;
export type BrandingConfig = typeof siteConfig.branding;
export type ProfileConfig = typeof siteConfig.profile;
