# AI Content Automation Agent 🤖

Automatic YouTube & Instagram content creator powered by AI. Generate trending videos and reels based on market demand and post them automatically!

## ✨ Features

- 🤖 **AI-Powered Content Generation** - Automatically creates scripts based on trending topics
- 🎬 **Video Creation** - Generates videos with voiceovers, subtitles, and background music
- 📊 **Trend Analysis** - Analyzes market trends to create relevant content
- 📱 **Multi-Platform Posting** - Posts to YouTube Shorts and Instagram Reels
- ⏰ **Automated Scheduling** - Set it and forget it with automatic posting
- 📈 **Analytics Dashboard** - Track your content performance
- 🎨 **Customizable Niches** - Technology, Motivation, Finance, and more

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env` file:

```env
# Optional: AI Services (for better content)
OPENAI_API_KEY=your_key_here

# Optional: YouTube API (for posting)
YOUTUBE_CLIENT_ID=your_client_id
YOUTUBE_CLIENT_SECRET=your_client_secret
YOUTUBE_REFRESH_TOKEN=your_refresh_token

# Optional: Instagram (for posting)
INSTAGRAM_USERNAME=your_username
INSTAGRAM_PASSWORD=your_password

# Content Settings
NICHE=technology,motivation,finance
POST_FREQUENCY_HOURS=24
```

### 3. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000`

### 4. Deploy to Vercel

```bash
npm run build
vercel deploy --prod
```

## 📖 How It Works

1. **Trend Analysis** - AI analyzes current trends in your chosen niche
2. **Script Generation** - Creates engaging 60-second video scripts
3. **Video Production** - Generates video with voiceover and visuals
4. **Platform Optimization** - Formats for YouTube Shorts (16:9) and Instagram Reels (9:16)
5. **Automatic Posting** - Uploads to both platforms with optimized titles and hashtags
6. **Performance Tracking** - Monitors views, likes, and engagement

## 🎯 Supported Niches

- 💻 Technology
- 💪 Motivation
- 💰 Finance
- 🏋️ Fitness
- 📊 Business
- And more!

## 🔧 Configuration

### Auto-Posting

Enable automatic posting in the dashboard. Set your preferred frequency (e.g., every 24 hours).

### Cron Job Setup

For automatic posting, set up a cron job to hit:

```
GET https://your-app.vercel.app/api/cron
```

Recommended services:
- [cron-job.org](https://cron-job.org) - Free
- [EasyCron](https://easycron.com) - Free tier available
- Vercel Cron Jobs - Built-in

## 🔑 API Setup Guide

### YouTube API Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project
3. Enable YouTube Data API v3
4. Create OAuth 2.0 credentials
5. Get your Client ID, Client Secret, and Refresh Token

### Instagram API Setup

**Option 1: Business Account (Recommended)**
- Use Instagram Graph API
- Requires Facebook Business account
- More stable and reliable

**Option 2: Personal Account**
- Use instagram-private-api
- Less reliable, may get rate limited

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (React)
- **Styling**: Tailwind CSS
- **AI**: OpenAI GPT-4
- **Video**: Replicate, D-ID
- **APIs**: YouTube Data API, Instagram Graph API
- **Deployment**: Vercel

## 📊 Dashboard Features

- ✅ Generate content with one click
- ✅ Create videos automatically
- ✅ Post to YouTube & Instagram
- ✅ Track performance metrics
- ✅ Configure posting schedule
- ✅ View activity logs

## 🤝 Free Alternatives

If you don't have API keys, the app will work in demo mode:

- Uses fallback content generation
- Simulates video creation
- Mock posting (shows success but doesn't actually post)

## 📝 License

MIT License - Free to use and modify!

## 🌟 Tips for Success

1. **Consistent Posting** - Post regularly for best results
2. **Trend Research** - Stay updated with your niche
3. **Quality Content** - Focus on value and engagement
4. **Optimize Titles** - Use attention-grabbing titles
5. **Use Hashtags** - Include relevant hashtags for discovery

## 🐛 Troubleshooting

**Videos not posting?**
- Check your API credentials
- Verify platform requirements
- Check rate limits

**Content not generating?**
- Ensure OpenAI API key is set
- Check API quota
- Try demo mode

**App not deploying?**
- Run `npm run build` locally first
- Check for TypeScript errors
- Verify environment variables

## 📧 Support

For issues and questions, open an issue on GitHub or check the documentation.

---

Made with ❤️ using AI automation
