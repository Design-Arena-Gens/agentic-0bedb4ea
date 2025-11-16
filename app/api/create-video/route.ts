import { NextResponse } from 'next/server';
import { storage } from '@/lib/storage';
import { generateVideo, createThumbnail } from '@/lib/videoGenerator';

export async function POST() {
  try {
    // Get the latest draft post
    const posts = storage.getAllPosts();
    const draftPost = posts.find(p => p.status === 'draft');

    if (!draftPost) {
      return NextResponse.json(
        { error: 'No draft content found. Generate content first.' },
        { status: 404 }
      );
    }

    // Update status to processing
    storage.updatePost(draftPost.id, { status: 'processing' });

    // Generate video
    const video = await generateVideo(draftPost.script, draftPost.title);

    // Create thumbnail
    const thumbnail = await createThumbnail(draftPost.title);

    // Update post with video info
    storage.updatePost(draftPost.id, {
      status: 'draft', // Ready for publishing
    });

    return NextResponse.json({
      success: true,
      videoUrl: video.url,
      thumbnail,
      duration: video.duration,
    });
  } catch (error) {
    console.error('Video creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create video' },
      { status: 500 }
    );
  }
}
