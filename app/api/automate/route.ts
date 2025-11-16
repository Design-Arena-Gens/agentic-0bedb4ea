import { NextRequest, NextResponse } from 'next/server';
import { analyzeTrends, generateContentIdea } from '@/lib/trendAnalyzer';
import { generateScript, generateTitle, generateDescription, generateHashtags } from '@/lib/contentGenerator';
import { generateVideo } from '@/lib/videoGenerator';
import { uploadToYouTube } from '@/lib/youtubeUploader';
import { uploadToInstagram } from '@/lib/instagramUploader';
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

    // Step 1: Analyze trends
    const trend = await analyzeTrends(niche);

    // Step 2: Generate content idea
    const contentIdea = await generateContentIdea(trend);

    // Step 3: Generate detailed script
    const script = await generateScript(contentIdea.title, niche);

    // Step 4: Generate optimized title
    const title = await generateTitle(script, niche);

    // Step 5: Create post in database
    const post = storage.addPost({
      title,
      script,
      platform: 'both',
      status: 'processing',
    });

    // Step 6: Generate video
    const video = await generateVideo(script, title);

    // Step 7: Prepare metadata
    const description = await generateDescription(title, niche);
    const tags = generateHashtags(niche);
    const hashtags = generateHashtags(niche);

    // Step 8: Upload to both platforms
    const results = {
      youtube: null as any,
      instagram: null as any,
    };

    try {
      // Upload to YouTube
      const youtubeResult = await uploadToYouTube(
        video.path,
        title,
        description,
        tags
      );
      results.youtube = youtubeResult;

      // Upload to Instagram
      const instagramResult = await uploadToInstagram(
        video.path,
        title,
        hashtags
      );
      results.instagram = instagramResult;

      // Update post status
      storage.updatePost(post.id, {
        status: 'published',
        url: youtubeResult.url,
        publishedAt: new Date(),
      });

      return NextResponse.json({
        success: true,
        message: 'Full automation completed successfully!',
        youtube: results.youtube,
        instagram: results.instagram,
        post: {
          id: post.id,
          title,
          trend: trend.topic,
        },
      });
    } catch (uploadError: any) {
      // If upload fails, mark as failed but return what we have
      storage.updatePost(post.id, { status: 'failed' });

      return NextResponse.json({
        success: false,
        message: 'Content generated but upload failed. Check API credentials.',
        error: uploadError.message,
        post: {
          id: post.id,
          title,
          script,
        },
      });
    }
  } catch (error: any) {
    console.error('Automation error:', error);
    return NextResponse.json(
      { error: error.message || 'Automation failed' },
      { status: 500 }
    );
  }
}
