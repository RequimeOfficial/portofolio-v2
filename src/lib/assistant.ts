import { profile, socialLinks, type SectionId } from '../data/profile';
import { projects } from '../data/projects';
import { techCategories, timeline, type TechCategoryKey } from '../data/skills';
import { blogPosts } from '../data/posts';
import type { Dictionary } from '../i18n';
import type { PostTexts } from '../i18n/posts/types';

export interface AssistantReply {
  text: string;
  /** Optional shortcut button that scrolls to a section. */
  action?: { label: string; sectionId: SectionId };
}

type ActionKey = keyof Dictionary['assistant']['actions'];

interface Intent {
  /** Keywords in every supported language (English, Indonesian, Japanese, Arabic). */
  keywords: string[];
  reply: (ctx: ReplyContext) => { text: string; action?: [ActionKey, SectionId] };
}

interface ReplyContext {
  t: Dictionary;
  posts: PostTexts;
}

const skillNames = (key: TechCategoryKey, count = 4) =>
  techCategories
    .find((c) => c.key === key)!
    .skills.slice(0, count)
    .map((s) => s.name);

/** Wraps text in Unicode LTR isolates so numbers like "+62 812…" don't get reordered inside Arabic text. */
const ltr = (text: string) => `\u2066${text}\u2069`;

/** Joins items with the language's list separator (", " / "、" / "، "). */
const list = (t: Dictionary, items: string[]) => items.join(t.common.listSeparator);

const intents: Intent[] = [
  {
    keywords: [
      'hello',
      'hi',
      'hey',
      'halo',
      'hai',
      'assalamualaikum',
      'pagi',
      'siang',
      'malam',
      'こんにちは',
      'こんばんは',
      'おはよう',
      'はじめまして',
      'مرحبا',
      'السلام',
      'اهلا',
      'هلا',
    ],
    reply: ({ t }) => ({ text: t.assistant.hello(profile.shortName) }),
  },
  {
    keywords: [
      'frontend',
      'front-end',
      'react',
      'next',
      'tailwind',
      'typescript',
      'フロントエンド',
      'الواجهة الامامية',
      'واجهة امامية',
    ],
    reply: ({ t }) => ({ text: t.assistant.frontend(list(t, skillNames('frontend'))), action: ['skills', 'skills'] }),
  },
  {
    keywords: [
      'backend',
      'back-end',
      'node',
      'express',
      'database',
      'mongodb',
      'postgres',
      'laravel',
      'php',
      'バックエンド',
      'データベース',
      'الواجهة الخلفية',
      'قاعدة بيانات',
      'قواعد البيانات',
    ],
    reply: ({ t }) => ({ text: t.assistant.backend(list(t, skillNames('backend'))), action: ['skills', 'skills'] }),
  },
  {
    keywords: ['game', 'unity', 'c#', 'gim', 'ゲーム', 'العاب', 'لعبة'],
    reply: ({ t }) => ({ text: t.assistant.game(list(t, skillNames('game'))), action: ['gameProjects', 'projects'] }),
  },
  {
    keywords: [
      'ai',
      'machine learning',
      'ml',
      'prompt',
      'llm',
      'chatbot',
      'openai',
      'gemini',
      'kecerdasan',
      '人工知能',
      '機械学習',
      'プロンプト',
      'ذكاء',
      'تعلم الالة',
    ],
    reply: ({ t }) => ({ text: t.assistant.ai(list(t, skillNames('ai'))), action: ['aiProjects', 'projects'] }),
  },
  {
    keywords: [
      'mobile',
      'android',
      'ios',
      'flutter',
      'react native',
      'aplikasi',
      'モバイル',
      'アプリ',
      'スマホ',
      'جوال',
      'تطبيق',
      'موبايل',
    ],
    reply: ({ t }) => ({ text: t.assistant.mobile(list(t, skillNames('mobile'))), action: ['skills', 'skills'] }),
  },
  {
    keywords: [
      'skill',
      'technology',
      'tech',
      'stack',
      'tools',
      'keahlian',
      'kemampuan',
      'bisa apa',
      'teknologi',
      'スキル',
      '技術',
      '得意',
      'مهار',
      'تقني',
      'قدرات',
    ],
    reply: ({ t }) => ({
      text: t.assistant.skills(
        profile.name,
        list(t, t.hero.roles),
        list(
          t,
          techCategories.map((c) => `${t.skills.categories[c.key]} (${list(t, skillNames(c.key, 2))})`),
        ),
      ),
      action: ['openSkills', 'skills'],
    }),
  },
  {
    keywords: [
      'experience',
      'background',
      'journey',
      'history',
      'career',
      'pengalaman',
      'riwayat',
      'karir',
      'year',
      '経験',
      '経歴',
      '歩み',
      'خبر',
      'مسير',
      'تجرب',
    ],
    reply: ({ t }) => ({
      text: t.assistant.experience(
        t.about.experience,
        timeline.map((item) => `${item.year}: ${t.about.timeline[item.year].title}`).join(' → '),
      ),
      action: ['journey', 'about'],
    }),
  },
  {
    keywords: [
      'available',
      'availability',
      'open to',
      'tersedia',
      'kosong',
      'sibuk',
      '依頼',
      '受けて',
      '対応可能',
      '空いて',
      'متاح',
      'متوفر',
      'للعمل',
    ],
    reply: ({ t }) => ({
      text: profile.available ? t.assistant.available : t.assistant.unavailable,
      action: ['contact', 'contact'],
    }),
  },
  {
    keywords: [
      'project',
      'portfolio',
      'work',
      'built',
      'proyek',
      'projek',
      'karya',
      'portofolio',
      'プロジェクト',
      '作品',
      '実績',
      'مشروع',
      'مشاريع',
      'اعمال',
    ],
    reply: ({ t }) => ({
      text: t.assistant.projects(
        list(
          t,
          projects.map((p) => t.projects.items[p.id].title),
        ),
      ),
      action: ['projects', 'projects'],
    }),
  },
  {
    keywords: ['blog', 'article', 'post', 'write', 'artikel', 'tulisan', 'ブログ', '記事', 'مدون', 'مقال'],
    reply: ({ t, posts }) => ({
      text: t.assistant.blog(
        blogPosts
          .slice(0, 3)
          .map((p) => `"${posts[p.slug].title}"`)
          .join(t.common.listSeparator),
      ),
      action: ['blog', 'blog'],
    }),
  },
  {
    keywords: [
      'service',
      'offer',
      'hire',
      'freelance',
      'jasa',
      'layanan',
      'harga',
      'price',
      'cost',
      'budget',
      'rate',
      'サービス',
      '料金',
      '費用',
      '見積',
      'خدم',
      'سعر',
      'تكلفة',
      'اسعار',
    ],
    reply: ({ t }) => ({ text: t.assistant.services(list(t, t.footer.serviceList)), action: ['quote', 'contact'] }),
  },
  {
    keywords: [
      'contact',
      'email',
      'reach',
      'phone',
      'whatsapp',
      'wa',
      'kontak',
      'hubungi',
      'menghubungi',
      'nomor',
      'telepon',
      '連絡',
      'メール',
      '電話',
      '問い合わせ',
      'تواصل',
      'اتصال',
      'بريد',
      'هاتف',
      'واتساب',
      'رقم',
    ],
    reply: ({ t }) => ({
      text: t.assistant.contact(ltr(profile.email), ltr(profile.phone)),
      action: ['goContact', 'contact'],
    }),
  },
  {
    keywords: [
      'social',
      'github',
      'instagram',
      'linkedin',
      'sosmed',
      'medsos',
      'sns',
      'インスタ',
      'ソーシャル',
      'تواصل اجتماعي',
      'انستغرام',
      'حساب',
    ],
    reply: ({ t }) => ({
      text: t.assistant.socials(
        list(
          t,
          socialLinks.map((s) => `${s.label} (${s.href.replace(/^mailto:/, '')})`),
        ),
      ),
    }),
  },
  {
    keywords: [
      'where',
      'location',
      'live',
      'from',
      'lokasi',
      'tinggal',
      'asal',
      'dimana',
      'mana',
      'どこ',
      '場所',
      '住んで',
      '出身',
      'اين',
      'موقع',
      'مكان',
      'يسكن',
      'تعيش',
    ],
    reply: ({ t }) => ({ text: t.assistant.location(t.about.location), action: ['map', 'contact'] }),
  },
  {
    keywords: [
      'who',
      'about',
      'yourself',
      'name',
      'siapa',
      'tentang',
      'nama',
      'age',
      'old',
      'umur',
      'usia',
      '誰',
      'だれ',
      '名前',
      '年齢',
      '何歳',
      '自己紹介',
      'من هو',
      'من انت',
      'اسم',
      'عمر',
      'نبذة',
    ],
    reply: ({ t }) => ({
      text: t.assistant.about(
        profile.name,
        profile.brand,
        t.hero.roles[0]!,
        t.about.location,
        t.about.age(profile.age),
        t.about.bio,
      ),
      action: ['about', 'about'],
    }),
  },
  {
    keywords: ['cv', 'resume', '履歴書', 'سيرة'],
    reply: ({ t }) => ({ text: t.assistant.cv, action: ['top', 'home'] }),
  },
  {
    keywords: ['thank', 'thanks', 'makasih', 'terima kasih', 'thx', 'ありがとう', 'どうも', 'شكرا', 'مشكور'],
    reply: ({ t }) => ({ text: t.assistant.thanks }),
  },
];

/** Lower-cases, folds full-width characters and strips Arabic diacritics so matching is forgiving. */
const normalize = (s: string) =>
  s
    .normalize('NFKC')
    .toLowerCase()
    .replace(/[ً-ٰٟـ]/g, '')
    .replace(/[أإآ]/g, 'ا')
    .replace(/[^\p{L}\p{N}#+\s-]/gu, ' ')
    .replace(/\s+/g, ' ');

const escapeRegExp = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/**
 * Latin keywords match on word boundaries ("ai" must not match "said"); keywords of 4+ letters may
 * also match as a prefix ("project" → "projects", "umur" → "umurnya"). Japanese and Arabic keywords
 * match anywhere, since Japanese has no spaces and Arabic attaches prefixes such as "ال".
 */
function compile(keyword: string) {
  const kw = normalize(keyword).trim();
  if (!/^[\x20-\x7e]+$/.test(kw)) return (text: string) => text.includes(kw);
  const end = kw.length >= 4 ? '' : '(?![a-z0-9])';
  const re = new RegExp(`(?<![a-z0-9])${escapeRegExp(kw)}${end}`);
  return (text: string) => re.test(text);
}

const compiled = intents.map((intent) => ({ intent, matchers: intent.keywords.map(compile) }));

/** Picks the intent with the most keyword matches and answers in the active UI language. */
export function getAssistantReply(question: string, t: Dictionary, posts: PostTexts): AssistantReply {
  const text = normalize(question);
  let best: Intent | null = null;
  let bestScore = 0;

  for (const { intent, matchers } of compiled) {
    const score = matchers.reduce((acc, match) => (match(text) ? acc + 1 : acc), 0);
    if (score > bestScore) {
      best = intent;
      bestScore = score;
    }
  }

  if (!best) {
    return {
      text: t.assistant.fallback(profile.shortName),
      action: { label: t.assistant.actions.message, sectionId: 'contact' },
    };
  }

  const { text: reply, action } = best.reply({ t, posts });
  return {
    text: reply,
    action: action ? { label: t.assistant.actions[action[0]], sectionId: action[1] } : undefined,
  };
}
