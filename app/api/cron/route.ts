import { NextResponse } from 'next/server';
import { storage } from '@/lib/storage';
import { analyzeTrends, generateContentIdea } from '@/lib/trendAnalyzer';
import { generateScript, generateTitle } from '@/lib/contentGenerator';

// This endpoint can be called by cron services like:
// - Vercel Cron Jobs
// - cron-job.org
// - EasyCron
// - GitHub Actions

export async function GET() {
  try {
    const config = storage.getConfig();

    if (!config.autoPost) {
      return NextResponse.json({
        success: false,
        message: 'Auto-posting is disabled',
      });
    }

    // Check if enough time has passed since last post
    const stats = storage.getStats();
    if (stats.lastPost) {
      const lastPostTime = new Date(stats.lastPost).getTime();
      const now = Date.now();
      const hoursSinceLastPost = (now - lastPostTime) / (1000 * 60 * 60);

      if (hoursSinceLastPost < parseInt(config.frequency)) {
        return NextResponse.json({
          success: false,
          message: `Not enough time passed. Last post was ${hoursSinceLastPost.toFixed(1)} hours ago.`,
        });
      }
    }

    // Generate and post content
    const trend = await analyzeTrends(config.niche);
    const contentIdea = await generateContentIdea(trend);
    const script = await generateScript(contentIdea.title, config.niche);
    const title = await generateTitle(script, config.niche);

    const post = storage.addPost({
      title,
      script,
      platform: 'both',
      status: 'published',
      publishedAt: new Date(),
    });

    return NextResponse.json({
      success: true,
      message: 'Content automatically generated and posted!',
      post: {
        id: post.id,
        title,
        trend: trend.topic,
      },
    });
  } catch (error: any) {
    console.error('Cron job error:', error);
    return NextResponse.json(
      { error: error.message || 'Cron job failed' },
      { status: 500 }
    );
  }
}

export async function POST() {
  return GET();
}
