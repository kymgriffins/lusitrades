# Lorde Merchant - YouTube Portfolio

A professional YouTube portfolio website for Lorde Merchant, showcasing trading insights, market analysis, and educational content. Built with Next.js 16, React 19, TypeScript, and advanced UI components.

## 🚀 Features

- **Professional Portfolio**: Showcase YouTube channel statistics and content
- **Video Library**: Browse and filter trading education videos
- **Analytics Dashboard**: Track channel performance and audience insights
- **Responsive Design**: Optimized for all devices and screen sizes
- **Dark/Light Theme**: Automatic theme switching with user preferences
- **Advanced UI**: Resizable sidebar, smooth animations, and modern design
- **Performance Optimized**: Fast loading with Next.js optimizations

## 📊 Channel Overview

- **45.2K+ Subscribers**
- **2.8M+ Total Views**
- **156 Videos** published
- **8.7% Average Engagement Rate**

## 🏗️ Project Structure

```
lordemerchant/
├── src/
│   ├── app/
│   │   ├── dashboard/
│   │   │   ├── layout.tsx          # Main dashboard layout
│   │   │   ├── page.tsx            # Portfolio overview
│   │   │   ├── videos/
│   │   │   │   └── page.tsx        # Video library
│   │   │   └── analytics/
│   │   │       └── page.tsx        # Analytics dashboard
│   │   ├── globals.css             # Global styles
│   │   ├── layout.tsx              # Root layout
│   │   └── page.tsx                # Redirect to dashboard
│   ├── components/
│   │   ├── ui/                     # shadcn/ui components
│   │   ├── resizable-sidebar.tsx   # Advanced sidebar
│   │   ├── sidebar-layout-adjuster.tsx
│   │   ├── theme-provider.tsx      # Theme management
│   │   └── theme-toggle.tsx        # Theme switcher
│   └── lib/
│       └── utils.ts                # Utility functions
├── components.json                 # shadcn/ui config
├── package.json
└── README.md
```

## 🎯 Pages

### Portfolio Overview (`/dashboard`)
- Channel statistics and growth metrics
- Latest video highlights
- Professional bio and expertise areas
- Subscriber growth visualization

### Video Library (`/dashboard/videos`)
- Grid layout of all videos
- Category filtering (Strategy, Analysis, Education, Crypto, etc.)
- Search functionality
- Video performance metrics (views, likes, duration)
- Hover effects and play buttons

### Analytics Dashboard (`/dashboard/analytics`)
- Comprehensive channel analytics
- Audience demographics (age, gender, location)
- Performance metrics over time
- Top performing content analysis
- Export functionality

## 🎨 Design Features

### Advanced Sidebar
- **Drag to resize** (200px - 400px width)
- **Collapse/expand** functionality
- **Persistent state** using localStorage
- **Smooth animations** and transitions

### Theme System
- **Light/Dark/System** modes
- **Automatic detection** of user preferences
- **Consistent theming** across all components
- **CSS custom properties** for easy customization

### Professional UI
- **shadcn/ui components** - 50+ professionally designed elements
- **Tailwind CSS v4** with custom design tokens
- **Responsive grid layouts**
- **Interactive hover states**
- **Loading states and animations**

## 🛠️ Technology Stack

- **Next.js 16** - React framework with App Router
- **React 19** - Latest React features
- **TypeScript** - Type safety and better DX
- **Tailwind CSS v4** - Utility-first styling
- **shadcn/ui** - Component library
- **Lucide React** - Beautiful icons
- **next-themes** - Theme management

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or pnpm

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd lordemerchant
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## 📈 Content Management

### Adding New Videos

Update the `videos` array in `src/app/dashboard/videos/page.tsx`:

```typescript
{
  id: 7,
  title: "New Video Title",
  description: "Video description",
  thumbnail: "/api/placeholder/320/180",
  views: "5.2K",
  likes: "234",
  duration: "15:30",
  publishedAt: "1 day ago",
  category: "Strategy"
}
```

### Updating Analytics Data

Modify the `analyticsData` object in `src/app/dashboard/analytics/page.tsx` with real YouTube Analytics data.

### Customizing Channel Info

Update the portfolio information in `src/app/dashboard/page.tsx`:
- Subscriber count
- Total views
- Video count
- Bio and expertise areas

## 🎨 Customization

### Colors and Branding

Edit `src/app/globals.css` to customize the color scheme:

```css
:root {
  --primary: oklch(0.6 0.2 280); /* Custom brand color */
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
}
```

### Adding New Sections

1. Create new route in `src/app/dashboard/`
2. Add navigation item to sidebar in `src/components/resizable-sidebar.tsx`
3. Implement the page component

### Theme Customization

The app supports custom themes. Add new theme variants in the theme provider configuration.

## 📊 YouTube Integration

### Future API Integration

The app is designed to easily integrate with YouTube Data API v3:

1. **Authentication**: OAuth 2.0 flow for channel access
2. **Data Fetching**: Real-time channel statistics
3. **Video Management**: Automated video library updates
4. **Analytics**: Live performance metrics

### API Endpoints (Planned)

- `GET /api/youtube/channel` - Channel information
- `GET /api/youtube/videos` - Video list and details
- `GET /api/youtube/analytics` - Performance metrics

## 📱 Responsive Design

The app is fully responsive and optimized for:
- **Desktop**: Full sidebar and multi-column layouts
- **Tablet**: Collapsible sidebar and adjusted grids
- **Mobile**: Single column layout with touch-friendly interactions

## 🚀 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Connect to Vercel
3. Automatic deployments on push

### Other Platforms

Compatible with:
- Netlify
- Railway
- DigitalOcean App Platform
- Self-hosted with Docker

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is built for Lorde Merchant's YouTube portfolio. All rights reserved.

## 🙏 Acknowledgments

- **Lorde Merchant** - Trading expertise and content
- **shadcn/ui** - Amazing component library
- **Next.js team** - Excellent framework
- **Tailwind CSS** - Utility-first styling approach

---

Built with ❤️ for professional YouTube content creators
"# lordeofmerchants" 
"# lusitrades" 
