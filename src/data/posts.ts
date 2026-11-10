import type { PostSlug } from '../i18n/posts/types';

export type BlogCategory = 'Web Dev' | 'Game Dev' | 'AI';

/** Language-neutral post data. Titles, excerpts and bodies live in src/i18n/posts/<lang>.ts. */
export interface BlogPost {
  id: number;
  slug: PostSlug;
  category: BlogCategory;
  date: string;
  /** Reading time in minutes. */
  minutes: number;
  image: string;
  tags: string[];
  likes: number;
  featured: boolean;
}

export const blogCategories: Array<'All' | BlogCategory> = ['All', 'Web Dev', 'Game Dev', 'AI'];

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    slug: 'scalable-react-applications',
    category: 'Web Dev',
    date: '2024-01-15',
    minutes: 8,
    image: '/images/react-scalable-apps.jpg',
    tags: ['React', 'Performance', 'Best Practices'],
    likes: 42,
    featured: true,
  },
  {
    id: 2,
    slug: 'unity-concept-to-launch',
    category: 'Game Dev',
    date: '2024-01-10',
    minutes: 12,
    image: '/images/unity-game-dev.jpg',
    tags: ['Unity', 'Game Design', 'C#'],
    likes: 28,
    featured: false,
  },
  {
    id: 3,
    slug: 'ai-in-web-development-prompt-engineering',
    category: 'AI',
    date: '2024-01-05',
    minutes: 10,
    image: '/images/ai-web-dev.jpg',
    tags: ['AI', 'Machine Learning', 'Prompt Engineering'],
    likes: 56,
    featured: true,
  },
  {
    id: 4,
    slug: 'nodejs-performance-optimization',
    category: 'Web Dev',
    date: '2023-12-28',
    minutes: 6,
    image: 'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=600',
    tags: ['Node.js', 'Performance', 'Backend'],
    likes: 34,
    featured: false,
  },
  {
    id: 5,
    slug: 'immersive-vr-experiences',
    category: 'Game Dev',
    date: '2023-12-20',
    minutes: 9,
    image: '/images/vr-experience.jpg',
    tags: ['VR', 'Unity', 'Game Development'],
    likes: 23,
    featured: false,
  },
  {
    id: 6,
    slug: 'integrating-chatgpt-api',
    category: 'AI',
    date: '2023-12-15',
    minutes: 7,
    image: '/images/chatgpt-integration.jpg',
    tags: ['OpenAI', 'API Integration', 'ChatGPT'],
    likes: 67,
    featured: false,
  },
];
