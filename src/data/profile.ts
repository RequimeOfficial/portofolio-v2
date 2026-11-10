import type { LucideIcon } from 'lucide-react';
import { Github, Instagram, Mail, MessageCircle } from 'lucide-react';

const BIRTH_DATE = '2006-10-29';

/** Age in whole years, computed from the birth date so it never goes stale. */
export function ageFrom(isoDate: string, today = new Date()) {
  const birth = new Date(`${isoDate}T00:00:00`);
  let age = today.getFullYear() - birth.getFullYear();
  const beforeBirthday =
    today.getMonth() < birth.getMonth() || (today.getMonth() === birth.getMonth() && today.getDate() < birth.getDate());
  if (beforeBirthday) age--;
  return age;
}

/**
 * Single source of truth for language-neutral personal info used across the site.
 * All visible text (bio, roles, labels...) lives in src/i18n/<lang>.ts.
 * Leave a social `href` empty to hide that link everywhere.
 */
export const profile = {
  name: 'Ahmad Mofidur Robbiyal Aqla',
  shortName: 'Robbi',
  brand: 'Requime',
  birthDate: BIRTH_DATE,
  /** Current age in years (localized label comes from the dictionary). */
  age: ageFrom(BIRTH_DATE),
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

/** Section ids in page order; their labels come from `t.nav.items`. */
export const navItems = [
  'home',
  'about',
  'skills',
  'projects',
  'ai-section',
  'testimonials',
  'blog',
  'contact',
] as const;

export type SectionId = (typeof navItems)[number];
