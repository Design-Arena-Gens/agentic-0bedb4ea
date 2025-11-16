import axios from 'axios';

export interface TrendData {
  topic: string;
  keywords: string[];
  hashtagsSuggestions: string[];
  contentIdea: string;
}

export async function analyzeTrends(niche: string): Promise<TrendData> {
  // Simulating trend analysis - in production, this would connect to real APIs
  const niches = niche.split(',').map(n => n.trim());
  const selectedNiche = niches[Math.floor(Math.random() * niches.length)];

  const trendIdeas: Record<string, TrendData> = {
    technology: {
      topic: 'AI Revolution in 2024',
      keywords: ['artificial intelligence', 'machine learning', 'automation', 'future tech'],
      hashtagsSuggestions: ['#AI', '#Technology', '#Innovation', '#FutureTech', '#MachineLearning'],
      contentIdea: 'How AI is transforming everyday life and creating new opportunities',
    },
    motivation: {
      topic: '5 Morning Habits of Successful People',
      keywords: ['success', 'productivity', 'morning routine', 'habits', 'growth mindset'],
      hashtagsSuggestions: ['#Motivation', '#Success', '#GrowthMindset', '#Productivity', '#SelfImprovement'],
      contentIdea: 'Simple morning habits that successful people swear by',
    },
    finance: {
      topic: 'Smart Money Moves in 2024',
      keywords: ['investing', 'savings', 'passive income', 'financial freedom', 'wealth building'],
      hashtagsSuggestions: ['#Finance', '#Investing', '#MoneyTips', '#WealthBuilding', '#FinancialFreedom'],
      contentIdea: 'Practical strategies to grow your wealth in the current economy',
    },
    fitness: {
      topic: 'Transform Your Body in 30 Days',
      keywords: ['fitness', 'workout', 'health', 'transformation', 'exercise'],
      hashtagsSuggestions: ['#Fitness', '#Workout', '#HealthyLifestyle', '#FitnessMotivation', '#GymLife'],
      contentIdea: '30-day fitness challenge that actually works',
    },
    business: {
      topic: 'Build a 6-Figure Side Hustle',
      keywords: ['entrepreneurship', 'side hustle', 'business', 'online income', 'startup'],
      hashtagsSuggestions: ['#Business', '#Entrepreneur', '#SideHustle', '#StartUp', '#BusinessTips'],
      contentIdea: 'Step-by-step guide to building a profitable side business',
    },
  };

  return trendIdeas[selectedNiche as keyof typeof trendIdeas] || trendIdeas.technology;
}

export async function generateContentIdea(trend: TrendData): Promise<{
  title: string;
  description: string;
  script: string;
  duration: number;
}> {
  const titles = [
    `${trend.topic} - What You Need to Know`,
    `The Truth About ${trend.topic}`,
    `${trend.topic}: Complete Guide`,
    `How ${trend.topic} Will Change Everything`,
    `${trend.topic} - Expert Tips & Tricks`,
  ];

  const title = titles[Math.floor(Math.random() * titles.length)];

  const script = generateScript(trend);

  return {
    title,
    description: trend.contentIdea,
    script,
    duration: 60, // 60 seconds for reels/shorts
  };
}

function generateScript(trend: TrendData): string {
  return `
[HOOK - First 3 seconds]
Did you know that ${trend.topic}? This will blow your mind!

[INTRODUCTION - 5 seconds]
Hey everyone! Today we're diving into ${trend.topic} and I'm going to share some game-changing insights.

[MAIN CONTENT - 40 seconds]
Here are the top 5 things you need to know:

1. ${trend.keywords[0].toUpperCase()}: This is absolutely crucial because it forms the foundation of everything we're discussing today.

2. ${trend.keywords[1].toUpperCase()}: Most people overlook this, but it's one of the most powerful strategies you can use.

3. ${trend.keywords[2].toUpperCase()}: This technique has helped thousands of people achieve incredible results.

4. The secret that experts don't want you to know - ${trend.keywords[3]}.

5. And finally, the most important factor - consistency and taking action every single day.

[CALL TO ACTION - 10 seconds]
If you found this helpful, make sure to follow for more content like this!

Drop a comment with your biggest takeaway, and don't forget to share this with someone who needs to see it!

[OUTRO - 2 seconds]
See you in the next one! 🚀
  `.trim();
}
