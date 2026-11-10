export const LANGUAGES = [
  { code: 'en', label: 'English', short: 'EN', locale: 'en-US', dir: 'ltr' },
  { code: 'id', label: 'Bahasa Indonesia', short: 'ID', locale: 'id-ID', dir: 'ltr' },
  { code: 'ja', label: '日本語', short: 'JA', locale: 'ja-JP', dir: 'ltr' },
  { code: 'ar', label: 'العربية', short: 'AR', locale: 'ar-SA-u-nu-latn', dir: 'rtl' },
] as const;

export type Lang = (typeof LANGUAGES)[number]['code'];
export type LanguageInfo = (typeof LANGUAGES)[number];

export const DEFAULT_LANG: Lang = 'en';

export const isLang = (value: unknown): value is Lang => LANGUAGES.some((l) => l.code === value);

export const languageInfo = (lang: Lang): LanguageInfo => LANGUAGES.find((l) => l.code === lang)!;
