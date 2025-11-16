import OpenAI from 'openai';

const openai = process.env.OPENAI_API_KEY
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;

export async function generateScript(topic: string, niche: string): Promise<string> {
  if (!openai) {
    // Fallback script generation
    return generateFallbackScript(topic, niche);
  }

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        {
          role: 'system',
          content: `You are a viral content creator specializing in ${niche}. Create engaging, concise scripts for 60-second videos that hook viewers in the first 3 seconds and provide value.`,
        },
        {
          role: 'user',
          content: `Create a 60-second video script about: ${topic}. Include a strong hook, main points, and call to action. Make it engaging and optimized for social media.`,
        },
      ],
      max_tokens: 500,
      temperature: 0.8,
    });

    return completion.choices[0].message.content || generateFallbackScript(topic, niche);
  } catch (error) {
    console.error('OpenAI API error:', error);
    return generateFallbackScript(topic, niche);
  }
}

function generateFallbackScript(topic: string, niche: string): string {
  return `
🎬 SCRIPT FOR: ${topic}

[HOOK - 0:00-0:03]
🔥 Stop scrolling! This ${niche} tip will change your life!

[INTRO - 0:03-0:08]
Welcome back! Today I'm sharing something incredible about ${topic}

[MAIN CONTENT - 0:08-0:50]
Here's what you need to know:

✅ First, understand the basics - ${topic} is trending right now for a reason
✅ Second, this technique has helped thousands of people succeed
✅ Third, you can start implementing this TODAY
✅ Fourth, the results speak for themselves
✅ Finally, consistency is key to seeing real results

The secret? Take action NOW, not tomorrow!

[CTA - 0:50-0:58]
💡 Follow for more ${niche} content!
💬 Comment your thoughts below!
🔄 Share this with someone who needs to see it!

[OUTRO - 0:58-1:00]
Let's grow together! 🚀
  `.trim();
}

export async function generateTitle(script: string, niche: string): Promise<string> {
  if (!openai) {
    return `Amazing ${niche} Tips You Need to Know! 🔥`;
  }

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        {
          role: 'system',
          content: 'You are an expert at creating viral video titles. Create catchy, click-worthy titles under 100 characters.',
        },
        {
          role: 'user',
          content: `Create a viral title for this video script:\n\n${script}`,
        },
      ],
      max_tokens: 50,
      temperature: 0.9,
    });

    return completion.choices[0].message.content || `Amazing ${niche} Tips You Need to Know! 🔥`;
  } catch (error) {
    console.error('OpenAI API error:', error);
    return `Amazing ${niche} Tips You Need to Know! 🔥`;
  }
}

export async function generateDescription(title: string, niche: string): Promise<string> {
  return `${title}

In this video, we explore the latest trends in ${niche} and share actionable tips you can implement today!

🔔 Subscribe for more content
👍 Like if you found this helpful
💬 Comment your thoughts below
🔄 Share with your friends

#${niche} #Viral #Trending #Tips #Tutorial #HowTo #2024

---
Created with AI Content Automation Agent
`;
}

export function generateHashtags(niche: string): string[] {
  const baseHashtags = ['viral', 'trending', 'fyp', 'foryou', 'explore', '2024'];
  const nicheHashtags: Record<string, string[]> = {
    technology: ['tech', 'ai', 'innovation', 'coding', 'gadgets', 'future'],
    motivation: ['motivation', 'inspiration', 'success', 'mindset', 'goals', 'hustle'],
    finance: ['finance', 'money', 'investing', 'wealth', 'business', 'entrepreneur'],
    fitness: ['fitness', 'workout', 'gym', 'health', 'fit', 'training'],
    business: ['business', 'entrepreneur', 'startup', 'marketing', 'sales', 'growth'],
  };

  const specific = nicheHashtags[niche.toLowerCase()] || nicheHashtags.technology;
  return [...specific, ...baseHashtags];
}
