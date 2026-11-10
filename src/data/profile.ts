import type { LucideIcon } from 'lucide-react';
import { Github, Instagram, Mail, MessageCircle } from 'lucide-react';

/**
 * Single source of truth for personal info used across the site.
 * Leave a social `href` empty to hide that link everywhere.
 */
export const profile = {
  name: 'Ahmad Mofidur Robbiyal Aqla',
  shortName: 'Robbi',
  brand: 'Requime',
  roles: ['Full Stack Developer', 'Prompt Engineer', 'Game Dev'],
  tagline: "Code is poetry, and I'm here to write beautiful verses that solve real-world problems.",
  bio:
    'A passionate Full Stack Developer with expertise in modern web technologies, game development, ' +
    'and AI integration. I love creating digital experiences that solve real-world problems and bring ideas to life.',
  age: '22 Years Old',
  location: 'Sumenep, Indonesia',
  interest: 'Coding & Analysis',
  experience: '3+ Years Experience',
  avatar: '/images/alif.jpg',
  email: 'owner@requime.com',
  phone: '+62 877 2985 0738',
  phoneHref: 'tel:+6287729850738',
  whatsapp: 'https://wa.me/6287729850738',
  mapsUrl: 'https://maps.app.goo.gl/sS3xdvwiDfAHwRoG6',
  mapsEmbed: 'https://www.google.com/maps?q=Sumenep,+Jawa+Timur,+Indonesia&z=12&output=embed',
  github: 'https://github.com/RequimeOfficial',
  cvUrl: '/cv/Ahmad-Mofidur-Robbiyal-Aqla-CV.pdf',
  available: true,
};

export interface SocialLink {
  label: string;
  href: string;
  icon: LucideIcon;
  hoverClass: string;
}

const allSocials: SocialLink[] = [
  { label: 'GitHub', href: profile.github, icon: Github, hoverClass: 'hover:text-gray-900 dark:hover:text-white' },
  { label: 'Instagram', href: 'https://instagram.com/requime__', icon: Instagram, hoverClass: 'hover:text-pink-500' },
  { label: 'WhatsApp', href: profile.whatsapp, icon: MessageCircle, hoverClass: 'hover:text-green-500' },
  { label: 'Email', href: `mailto:${profile.email}`, icon: Mail, hoverClass: 'hover:text-neon-blue' },
  // Add more, e.g. { label: 'LinkedIn', href: 'https://linkedin.com/in/<username>', icon: Linkedin, ... }
];

export const socialLinks = allSocials.filter((s) => s.href.trim() !== '');

export const navItems = [
  { name: 'Home', id: 'home' },
  { name: 'About', id: 'about' },
  { name: 'Skills', id: 'skills' },
  { name: 'Projects', id: 'projects' },
  { name: 'AI Chat', id: 'ai-section' },
  { name: 'Testimonials', id: 'testimonials' },
  { name: 'Blog', id: 'blog' },
  { name: 'Contact', id: 'contact' },
] as const;

export const services = [
  'Web Development',
  'Game Development',
  'AI Integration',
  'Mobile Apps',
  'UI/UX Design',
  'Consulting',
];
