/** Role and quote text live in `t.testimonials.items` (translated per language). */
export interface Testimonial {
  id: 1 | 2 | 3 | 4;
  name: string;
  company: string;
  rating: number;
  /** Optional photo; initials are shown when missing or failing to load. */
  avatar?: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Faruq Althoimi',
    company: 'TechCorp',
    rating: 5,
    avatar: '/images/derren.jpg',
  },
  {
    id: 2,
    name: 'Nanael',
    company: 'Jb',
    rating: 5,
  },
  {
    id: 3,
    name: 'Andrian',
    company: 'IndieGames',
    rating: 5,
  },
  {
    id: 4,
    name: 'Widonarko',
    company: 'WebSolutions',
    rating: 4,
    avatar: 'https://images.pexels.com/photos/1382734/pexels-photo-1382734.jpeg?auto=compress&cs=tinysrgb&w=150',
  },
];

/** Labels come from `t.testimonials.stats` (same order). */
export const testimonialStats = [
  { number: '50+', icon: '😊' },
  { number: '4.9/5', icon: '⭐' },
  { number: '100%', icon: '🎯' },
  { number: '24/7', icon: '💬' },
];
