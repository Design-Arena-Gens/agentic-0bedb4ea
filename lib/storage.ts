// Simple in-memory storage for demo
// In production, use a database like PostgreSQL, MongoDB, or Supabase

interface Post {
  id: string;
  title: string;
  script: string;
  platform: 'youtube' | 'instagram' | 'both';
  status: 'draft' | 'processing' | 'published' | 'failed';
  url?: string;
  createdAt: Date;
  publishedAt?: Date;
}

interface Stats {
  totalPosts: number;
  youtubeVideos: number;
  instagramReels: number;
  lastPost: string | null;
}

class Storage {
  private posts: Map<string, Post> = new Map();
  private config: any = {
    autoPost: false,
    frequency: 24,
    niche: 'technology,motivation,finance',
  };

  addPost(post: Omit<Post, 'id' | 'createdAt'>): Post {
    const id = `post_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const newPost: Post = {
      ...post,
      id,
      createdAt: new Date(),
    };
    this.posts.set(id, newPost);
    return newPost;
  }

  updatePost(id: string, updates: Partial<Post>): Post | null {
    const post = this.posts.get(id);
    if (!post) return null;

    const updatedPost = { ...post, ...updates };
    this.posts.set(id, updatedPost);
    return updatedPost;
  }

  getPost(id: string): Post | null {
    return this.posts.get(id) || null;
  }

  getAllPosts(): Post[] {
    return Array.from(this.posts.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  getStats(): Stats {
    const allPosts = this.getAllPosts();
    const published = allPosts.filter(p => p.status === 'published');

    return {
      totalPosts: published.length,
      youtubeVideos: published.filter(
        p => p.platform === 'youtube' || p.platform === 'both'
      ).length,
      instagramReels: published.filter(
        p => p.platform === 'instagram' || p.platform === 'both'
      ).length,
      lastPost: published.length > 0
        ? published[0].publishedAt?.toISOString() || null
        : null,
    };
  }

  setConfig(config: any): void {
    this.config = { ...this.config, ...config };
  }

  getConfig(): any {
    return this.config;
  }

  clearOldPosts(daysToKeep: number = 30): void {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysToKeep);

    const entries = Array.from(this.posts.entries());
    for (const [id, post] of entries) {
      if (post.createdAt < cutoffDate) {
        this.posts.delete(id);
      }
    }
  }
}

export const storage = new Storage();
export type { Post, Stats };
