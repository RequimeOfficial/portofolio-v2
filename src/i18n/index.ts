import type { Lang } from './languages';
import en, { type Dictionary } from './en';
import id from './id';
import ja from './ja';
import ar from './ar';
import postsEn from './posts/en';
import postsId from './posts/id';
import postsJa from './posts/ja';
import postsAr from './posts/ar';
import type { PostTexts } from './posts/types';

export type { Dictionary } from './en';
export * from './languages';

export const dictionaries: Record<Lang, Dictionary> = { en, id, ja, ar };
export const postTexts: Record<Lang, PostTexts> = { en: postsEn, id: postsId, ja: postsJa, ar: postsAr };
