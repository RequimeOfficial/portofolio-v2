export interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  rating: number;
  content: string;
  /** Optional photo; initials are shown when missing or failing to load. */
  avatar?: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Faruq Althoimi',
    role: 'Product Manager',
    company: 'TechCorp',
    rating: 5,
    content:
      'Requime delivered exceptional work on our e-commerce platform. His attention to detail and technical expertise exceeded our expectations.',
    avatar: '/images/derren.jpg',
  },
  {
    id: 2,
    name: 'Nanael',
    role: 'AI Engineer',
    company: 'Jb',
    rating: 5,
    content:
      'Outstanding AI integration work! Requime helped us implement a chatbot that increased our customer satisfaction by 40%.',
  },
  {
    id: 3,
    name: 'Andrian',
    role: 'Game Designer',
    company: 'IndieGames',
    rating: 5,
    content:
      'Requime brought our game concept to life with incredible Unity skills. The gameplay mechanics are smooth and engaging.',
  },
  {
    id: 4,
    name: 'Widonarko',
    role: 'Founder',
    company: 'WebSolutions',
    rating: 4,
    content:
      'Professional, reliable, and technically sound. Requime completed our project ahead of schedule with excellent quality.',
    avatar: 'https://images.pexels.com/photos/1382734/pexels-photo-1382734.jpeg?auto=compress&cs=tinysrgb&w=150',
  },
];

export const testimonialStats = [
  { number: '50+', label: 'Happy Clients', icon: '😊' },
  { number: '4.9/5', label: 'Average Rating', icon: '⭐' },
  { number: '100%', label: 'Project Success', icon: '🎯' },
  { number: '24/7', label: 'Support', icon: '💬' },
];
