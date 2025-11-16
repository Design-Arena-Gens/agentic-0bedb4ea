import { NextRequest, NextResponse } from 'next/server';
import { analyzeTrends, generateContentIdea } from '@/lib/trendAnalyzer';
import { generateScript, generateTitle } from '@/lib/contentGenerator';
import { storage } from '@/lib/storage';

export async function POST(request: NextRequest) {
  try {
    const { niche } = await request.json();

    if (!niche) {
      return NextResponse.json(
        { error: 'Niche is required' },
        { status: 400 }
      );
    }

    // Analyze trends
    const trend = await analyzeTrends(niche);

    // Generate content idea
    const contentIdea = await generateContentIdea(trend);

    // Generate detailed script
    const script = await generateScript(contentIdea.title, niche);

    // Generate optimized title
    const title = await generateTitle(script, niche);

    // Store in database
    const post = storage.addPost({
      title,
      script,
      platform: 'both',
      status: 'draft',
    });

    return NextResponse.json({
      success: true,
      id: post.id,
      title,
      script,
      trend: trend.topic,
      hashtags: trend.hashtagsSuggestions,
    });
  } catch (error) {
    console.error('Content generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate content' },
      { status: 500 }
    );
  }
}
