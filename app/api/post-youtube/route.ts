import { NextResponse } from 'next/server';
import { storage } from '@/lib/storage';
import { uploadToYouTube } from '@/lib/youtubeUploader';
import { generateDescription, generateHashtags } from '@/lib/contentGenerator';

export async function POST() {
  try {
    // Get the latest draft post
    const posts = storage.getAllPosts();
    const draftPost = posts.find(p => p.status === 'draft');

    if (!draftPost) {
      return NextResponse.json(
        { error: 'No content ready for posting. Create a video first.' },
        { status: 404 }
      );
    }

    // Generate description and tags
    const description = await generateDescription(draftPost.title, 'technology');
    const tags = generateHashtags('technology');

    // Upload to YouTube
    const { url, videoId } = await uploadToYouTube(
      '/tmp/video.mp4', // Mock path
      draftPost.title,
      description,
      tags
    );

    // Update post status
    storage.updatePost(draftPost.id, {
      status: 'published',
      platform: 'youtube',
      url,
      publishedAt: new Date(),
    });

    return NextResponse.json({
      success: true,
      url,
      videoId,
      message: 'Successfully posted to YouTube!',
    });
  } catch (error: any) {
    console.error('YouTube posting error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to post to YouTube' },
      { status: 500 }
    );
  }
}
