export type ProjectCategory = 'Web' | 'AI' | 'Game';

/** Language-neutral project data. Titles and descriptions live in `t.projects.items`. */
export interface Project {
  id: 1 | 2 | 3 | 4 | 5 | 6;
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
    image: '/images/e-commerce-platform.jpg',
    technologies: ['PHP', 'Laravel', 'MySQL', 'Stripe'],
    category: 'Web',
    liveUrl: 'https://requime.com',
    githubUrl: 'https://github.com/RequimeOfficial',
    featured: true,
  },
  {
    id: 2,
    image: '/images/ai-chat-assistant.jpg',
    technologies: ['JavaScript', 'REST API', 'OpenAI', 'Gemini'],
    category: 'AI',
    liveUrl: 'https://yuri.yilziii.com',
    githubUrl: 'https://github.com/RequimeOfficial',
    featured: true,
  },
  {
    id: 3,
    image: '/images/catur-game.jpg',
    technologies: ['Unity', 'Java', '1 vs 1', 'Strategy'],
    category: 'Game',
    featured: false,
  },
  {
    id: 4,
    image: '/images/portfolio-website.jpg',
    technologies: ['JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS'],
    category: 'Web',
    liveUrl: 'https://portofolio1.yilziii.com',
    githubUrl: 'https://github.com/RequimeOfficial',
    featured: false,
  },
  {
    id: 5,
    image: 'https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=600',
    technologies: ['Python', 'FastAPI', 'TensorFlow', 'Docker'],
    category: 'AI',
    featured: false,
  },
  {
    id: 6,
    image:
      'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=600',
    technologies: ['Unity', 'C#', 'Mobile', 'UI/UX'],
    category: 'Game',
    featured: false,
  },
];
