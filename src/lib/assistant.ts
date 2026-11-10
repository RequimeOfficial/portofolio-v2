import { profile, services, socialLinks } from '../data/profile';
import { projects } from '../data/projects';
import { techCategories, timeline } from '../data/skills';
import { blogPosts } from '../data/posts';

export interface AssistantReply {
  text: string;
  /** Optional shortcut button that scrolls to a section. */
  action?: { label: string; sectionId: string };
}

interface Intent {
  keywords: string[];
  reply: () => AssistantReply;
}

const topSkills = (category: string) =>
  techCategories
    .find((c) => c.title === category)
    ?.skills.map((s) => s.name)
    .join(', ') ?? '';

// Keywords include English and Indonesian so visitors can ask in either language.
const intents: Intent[] = [
  {
    keywords: ['hello', 'hi', 'hey', 'halo', 'hai', 'assalamualaikum', 'pagi', 'siang', 'malam'],
    reply: () => ({
      text: `Hi there! 👋 I can tell you about ${profile.shortName}'s skills, projects, experience, services or how to get in touch. What would you like to know?`,
    }),
  },
  {
    keywords: ['frontend', 'front-end', 'react', 'next', 'tailwind', 'typescript'],
    reply: () => ({
      text: `On the frontend he works with ${topSkills('Frontend')}. React is his strongest tool (95%).`,
      action: { label: 'See tech stack', sectionId: 'skills' },
    }),
  },
  {
    keywords: ['backend', 'back-end', 'node', 'express', 'database', 'mongodb', 'postgres', 'laravel', 'php'],
    reply: () => ({
      text: `For backend work he uses ${topSkills('Backend')}, and he has shipped PHP/Laravel projects such as an e-commerce platform.`,
      action: { label: 'See tech stack', sectionId: 'skills' },
    }),
  },
  {
    keywords: ['game', 'unity', 'c#', 'gim'],
    reply: () => ({
      text: `Game development is one of his passions: ${topSkills('Game Development')}. Projects include a chess game and a mobile puzzle adventure.`,
      action: { label: 'See game projects', sectionId: 'projects' },
    }),
  },
  {
    keywords: ['ai', 'machine learning', 'ml', 'prompt', 'llm', 'chatbot', 'openai', 'gemini', 'kecerdasan'],
    reply: () => ({
      text: `In AI he focuses on ${topSkills('AI & Machine Learning')}. He built an AI chat assistant powered by OpenAI and Gemini.`,
      action: { label: 'See AI projects', sectionId: 'projects' },
    }),
  },
  {
    keywords: ['mobile', 'android', 'ios', 'flutter', 'react native', 'aplikasi'],
    reply: () => ({
      text: `For mobile apps he uses ${topSkills('Mobile Development')}.`,
      action: { label: 'See tech stack', sectionId: 'skills' },
    }),
  },
  {
    keywords: ['skill', 'technology', 'tech', 'stack', 'tools', 'keahlian', 'kemampuan', 'bisa apa', 'teknologi'],
    reply: () => ({
      text:
        `${profile.name} is a ${profile.roles.join(', ')}. Highlights: ` +
        techCategories
          .map(
            (c) =>
              `${c.title} (${c.skills
                .slice(0, 2)
                .map((s) => s.name)
                .join(', ')})`,
          )
          .join('; ') +
        '.',
      action: { label: 'Open tech stack', sectionId: 'skills' },
    }),
  },
  {
    keywords: ['experience', 'background', 'journey', 'history', 'career', 'pengalaman', 'riwayat', 'karir', 'year'],
    reply: () => ({
      text:
        `He has ${profile.experience.toLowerCase()}. ` + timeline.map((t) => `${t.year}: ${t.title}`).join(' → ') + '.',
      action: { label: 'View my journey', sectionId: 'about' },
    }),
  },
  {
    keywords: ['project', 'portfolio', 'work', 'built', 'proyek', 'projek', 'karya', 'portofolio'],
    reply: () => ({
      text: `Some of his projects: ${projects.map((p) => p.title).join(', ')}. You can filter them by Web, AI or Game.`,
      action: { label: 'Browse projects', sectionId: 'projects' },
    }),
  },
  {
    keywords: ['blog', 'article', 'post', 'write', 'artikel', 'tulisan'],
    reply: () => ({
      text: `He writes about web, game dev and AI. Latest articles: ${blogPosts
        .slice(0, 3)
        .map((p) => `"${p.title}"`)
        .join(', ')}.`,
      action: { label: 'Read the blog', sectionId: 'blog' },
    }),
  },
  {
    keywords: ['available', 'availability', 'open to', 'tersedia', 'kosong', 'sibuk'],
    reply: () => ({
      text: profile.available
        ? 'Yes! He is currently available for new projects and collaborations. 🚀'
        : 'He is fully booked at the moment, but feel free to reach out for future work.',
      action: { label: 'Get in touch', sectionId: 'contact' },
    }),
  },
  {
    keywords: ['service', 'offer', 'hire', 'freelance', 'jasa', 'layanan', 'harga', 'price', 'cost', 'budget', 'rate'],
    reply: () => ({
      text: `Services offered: ${services.join(', ')}. Pricing depends on scope — send the project details through the contact form for a quote.`,
      action: { label: 'Request a quote', sectionId: 'contact' },
    }),
  },
  {
    keywords: ['contact', 'email', 'reach', 'phone', 'whatsapp', 'wa', 'kontak', 'hubungi', 'nomor', 'telepon'],
    reply: () => ({
      text: `You can email ${profile.email}, message him on WhatsApp at ${profile.phone}, or use the contact form below. He usually replies within a day.`,
      action: { label: 'Go to contact', sectionId: 'contact' },
    }),
  },
  {
    keywords: ['social', 'github', 'instagram', 'linkedin', 'sosmed', 'medsos'],
    reply: () => ({
      text: `Find him online: ${socialLinks.map((s) => `${s.label} (${s.href.replace(/^mailto:/, '')})`).join(', ')}.`,
    }),
  },
  {
    keywords: ['where', 'location', 'live', 'from', 'lokasi', 'tinggal', 'asal', 'dimana', 'mana'],
    reply: () => ({
      text: `He is based in ${profile.location} and works with clients remotely.`,
      action: { label: 'See map', sectionId: 'contact' },
    }),
  },
  {
    keywords: ['who', 'about', 'yourself', 'name', 'siapa', 'tentang', 'nama', 'age', 'old', 'umur', 'usia'],
    reply: () => ({
      text: `${profile.name} (aka ${profile.brand}) is a ${profile.roles[0]} from ${profile.location}, ${profile.age.toLowerCase()}. ${profile.bio}`,
      action: { label: 'About me', sectionId: 'about' },
    }),
  },
  {
    keywords: ['cv', 'resume'],
    reply: () => ({
      text: 'You can download his CV with the "Download CV" button at the top of the page. 📄',
      action: { label: 'Go to top', sectionId: 'home' },
    }),
  },
  {
    keywords: ['thank', 'thanks', 'makasih', 'terima kasih', 'thx'],
    reply: () => ({ text: "You're welcome! 😊 Anything else you'd like to know?" }),
  },
];

const normalize = (s: string) =>
  ` ${s
    .toLowerCase()
    .replace(/[^\p{L}\p{N}#+\s-]/gu, ' ')
    .replace(/\s+/g, ' ')} `;

/** Picks the intent with the most keyword matches (word-based, so "ai" doesn't match "said"). */
export function getAssistantReply(question: string): AssistantReply {
  const text = normalize(question);
  let best: Intent | null = null;
  let bestScore = 0;

  for (const intent of intents) {
    // Short keywords must match a whole word; longer ones may also match a word prefix
    // (so "project" matches "projects" and "umur" matches the Indonesian "umurnya").
    const score = intent.keywords.reduce(
      (acc, kw) => (text.includes(` ${kw} `) || (kw.length >= 4 && text.includes(` ${kw}`)) ? acc + 1 : acc),
      0,
    );
    if (score > bestScore) {
      best = intent;
      bestScore = score;
    }
  }

  if (best) return best.reply();

  return {
    text: `Good question! I'm a simple knowledge-based assistant, so I might not know that one. Try asking about skills, projects, experience, services, availability or contact — or send ${profile.shortName} a message directly.`,
    action: { label: 'Send a message', sectionId: 'contact' },
  };
}
