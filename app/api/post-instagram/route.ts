import { NextResponse } from 'next/server';
import { storage } from '@/lib/storage';
import { uploadToInstagram } from '@/lib/instagramUploader';
import { generateHashtags } from '@/lib/contentGenerator';

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

    // Generate caption and hashtags
    const caption = draftPost.title;
    const hashtags = generateHashtags('technology');

    // Upload to Instagram
    const { success, postUrl } = await uploadToInstagram(
      '/tmp/video.mp4', // Mock path
      caption,
      hashtags
    );

    if (!success) {
      throw new Error('Instagram upload failed');
    }

    // Update post status
    storage.updatePost(draftPost.id, {
      status: 'published',
      platform: 'instagram',
      url: postUrl,
      publishedAt: new Date(),
    });

    return NextResponse.json({
      success: true,
      url: postUrl,
      message: 'Successfully posted to Instagram!',
    });
  } catch (error: any) {
    console.error('Instagram posting error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to post to Instagram' },
      { status: 500 }
    );
  }
}
