import type { LucideIcon } from 'lucide-react';
import { Github, Instagram, Mail, MessageCircle } from 'lucide-react';

const BIRTH_DATE = '2006-10-29';

/** Age in whole years, computed from the birth date so it never goes stale. */
function ageFrom(isoDate: string, today = new Date()) {
  const birth = new Date(`${isoDate}T00:00:00`);
  let age = today.getFullYear() - birth.getFullYear();
  const beforeBirthday =
    today.getMonth() < birth.getMonth() || (today.getMonth() === birth.getMonth() && today.getDate() < birth.getDate());
  if (beforeBirthday) age--;
  return age;
}

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
  birthDate: BIRTH_DATE,
  age: `${ageFrom(BIRTH_DATE)} Years Old`,
  location: 'Sumenep, Indonesia',
  interest: 'Coding & Analysis',
  experience: '3+ Years Experience',
  avatar: '/images/alif.jpg',
  email: 'robbiansah363@gmail.com',
  phone: '+62 812-5251-7329',
  phoneHref: 'tel:+6281252517329',
  whatsapp: 'https://wa.me/6281252517329',
  mapsUrl: 'https://maps.app.goo.gl/BUKFJa5YMDehFiqw8?g_st=ic',
  mapsEmbed: 'https://www.google.com/maps?q=-7.0786129,114.0393211&z=14&output=embed',
  github: 'https://github.com/RequimeOfficial',
  website: 'https://requime.my.id',
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
