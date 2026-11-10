export type ProjectCategory = 'Web' | 'AI' | 'Game';

export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  category: ProjectCategory;
  /** Leave undefined to hide the button. */
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
}

export const projectCategories: Array<'All' | ProjectCategory> = ['All', 'Web', 'AI', 'Game'];

export const projects: Project[] = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    description: 'Full-stack e-commerce solution built with PHP and Laravel, featuring Stripe payment integration.',
    image: '/images/e-commerce-platform.jpg',
    technologies: ['PHP', 'Laravel', 'MySQL', 'Stripe'],
    category: 'Web',
    liveUrl: 'https://requime.com',
    githubUrl: 'https://github.com/RequimeOfficial',
    featured: true,
  },
  {
    id: 2,
    title: 'AI Chat Assistant',
    description: 'Intelligent chatbot with natural language processing powered by OpenAI and Gemini APIs.',
    image: '/images/ai-chat-assistant.jpg',
    technologies: ['JavaScript', 'REST API', 'OpenAI', 'Gemini'],
    category: 'AI',
    liveUrl: 'https://yuri.yilziii.com',
    githubUrl: 'https://github.com/RequimeOfficial',
    featured: true,
  },
  {
    id: 3,
    title: 'Catur Game',
    description: 'Interactive chess game with 1 vs 1 strategic gameplay, built with Unity and Java.',
    image: '/images/catur-game.jpg',
    technologies: ['Unity', 'Java', '1 vs 1', 'Strategy'],
    category: 'Game',
    featured: false,
  },
  {
    id: 4,
    title: 'Simple Portfolio Website',
    description: 'Personal portfolio website with a modern design and fully responsive layout.',
    image: '/images/portfolio-website.jpg',
    technologies: ['JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS'],
    category: 'Web',
    liveUrl: 'https://portofolio1.yilziii.com',
    githubUrl: 'https://github.com/RequimeOfficial',
    featured: false,
  },
  {
    id: 5,
    title: 'Image Recognition API',
    description: 'Machine learning API for image classification and object detection.',
    image: 'https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=600',
    technologies: ['Python', 'FastAPI', 'TensorFlow', 'Docker'],
    category: 'AI',
    featured: false,
  },
  {
    id: 6,
    title: 'Puzzle Adventure',
    description: 'Mobile puzzle game with engaging mechanics and beautiful graphics.',
    image:
      'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=600',
    technologies: ['Unity', 'C#', 'Mobile', 'UI/UX'],
    category: 'Game',
    featured: false,
  },
];
