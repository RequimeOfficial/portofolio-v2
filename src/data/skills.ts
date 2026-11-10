import type { LucideIcon } from 'lucide-react';
import {
  Apple,
  BarChart2,
  Bot,
  Box,
  Brain,
  Brush,
  Code,
  Cpu,
  Database,
  Figma,
  Gamepad2,
  GitBranch,
  Hexagon,
  Image,
  Layers,
  PenLine,
  Server,
  Smartphone,
  Target,
  Terminal,
  Type,
} from 'lucide-react';

export interface Skill {
  name: string;
  level: number;
  icon: LucideIcon;
}

export interface TechCategory {
  title: string;
  color: string;
  skills: Skill[];
}

export const techCategories: TechCategory[] = [
  {
    title: 'Frontend',
    color: 'from-blue-500 to-cyan-500',
    skills: [
      { name: 'React', level: 95, icon: Layers },
      { name: 'Next.js', level: 90, icon: Terminal },
      { name: 'TypeScript', level: 88, icon: Type },
      { name: 'Tailwind CSS', level: 92, icon: Brush },
    ],
  },
  {
    title: 'Backend',
    color: 'from-green-500 to-emerald-500',
    skills: [
      { name: 'Node.js', level: 93, icon: Cpu },
      { name: 'Express', level: 90, icon: Server },
      { name: 'MongoDB', level: 85, icon: Database },
      { name: 'PostgreSQL', level: 82, icon: Database },
    ],
  },
  {
    title: 'Game Development',
    color: 'from-purple-500 to-pink-500',
    skills: [
      { name: 'Unity', level: 87, icon: Gamepad2 },
      { name: 'C#', level: 85, icon: Code },
      { name: 'Game Design', level: 80, icon: Target },
      { name: '3D Modeling', level: 75, icon: Box },
    ],
  },
  {
    title: 'AI & Machine Learning',
    color: 'from-orange-500 to-red-500',
    skills: [
      { name: 'TensorFlow', level: 80, icon: Brain },
      { name: 'Prompt Engineering', level: 92, icon: PenLine },
      { name: 'LLM Integration', level: 88, icon: Bot },
      { name: 'Data Analysis', level: 83, icon: BarChart2 },
    ],
  },
  {
    title: 'Design & Tools',
    color: 'from-indigo-500 to-purple-500',
    skills: [
      { name: 'Figma', level: 90, icon: Figma },
      { name: 'Adobe Suite', level: 85, icon: Image },
      { name: 'Git', level: 95, icon: GitBranch },
      { name: 'Docker', level: 78, icon: Box },
    ],
  },
  {
    title: 'Mobile Development',
    color: 'from-teal-500 to-blue-500',
    skills: [
      { name: 'React Native', level: 85, icon: Smartphone },
      { name: 'Flutter', level: 75, icon: Hexagon },
      { name: 'iOS Development', level: 70, icon: Apple },
      { name: 'Android', level: 72, icon: Smartphone },
    ],
  },
];

export const skillStats = [
  { number: '50+', label: 'Projects Completed', icon: '🚀' },
  { number: '25+', label: 'Technologies Mastered', icon: '💻' },
  { number: '3+', label: 'Years Experience', icon: '⭐' },
  { number: '100%', label: 'Client Satisfaction', icon: '❤️' },
];

export const timeline = [
  {
    year: '2020',
    title: 'Started Programming Journey',
    description: 'Began learning web development with HTML, CSS, and JavaScript',
    icon: Code,
  },
  {
    year: '2021',
    title: 'Full Stack Development',
    description: 'Mastered React, Node.js, and database technologies',
    icon: Server,
  },
  {
    year: '2022',
    title: 'Game Development',
    description: 'Explored Unity and C# for creating interactive experiences',
    icon: Gamepad2,
  },
  {
    year: '2023',
    title: 'AI Integration',
    description: 'Specialized in AI/ML and prompt engineering',
    icon: Brain,
  },
];
