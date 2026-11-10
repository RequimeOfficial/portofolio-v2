import { createContext, useContext } from 'react';
import type { Dictionary, Lang, LanguageInfo } from '../i18n';
import type { PostTexts } from '../i18n/posts/types';

export interface LanguageContextType {
  lang: Lang;
  info: LanguageInfo;
  setLang: (lang: Lang) => void;
  /** UI strings for the active language. */
  t: Dictionary;
  /** Blog article texts for the active language. */
  posts: PostTexts;
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useI18n = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useI18n must be used within a LanguageProvider');
  }
  return context;
};
