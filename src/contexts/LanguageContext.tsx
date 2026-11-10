import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { LanguageContext } from './language';
import { DEFAULT_LANG, LANGUAGES, dictionaries, isLang, languageInfo, postTexts, type Lang } from '../i18n';
import { storage } from '../lib/utils';

const STORAGE_KEY = 'lang';

/** Extra web fonts for scripts that Poppins/Inter don't cover; loaded only when that language is used. */
const SCRIPT_FONTS: Partial<Record<Lang, string>> = {
  ja: 'https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700;800&display=swap',
  ar: 'https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700;800&display=swap',
};

function loadScriptFont(lang: Lang) {
  const href = SCRIPT_FONTS[lang];
  if (!href || document.querySelector(`link[data-font="${lang}"]`)) return;
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = href;
  link.dataset.font = lang;
  document.head.appendChild(link);
}

/** Priority: ?lang= in the URL → saved choice → browser language → English. */
function detectLanguage(): Lang {
  const fromUrl = new URLSearchParams(window.location.search).get('lang');
  if (isLang(fromUrl)) return fromUrl;
  const saved = storage.get(STORAGE_KEY);
  if (isLang(saved)) return saved;
  for (const preferred of navigator.languages ?? [navigator.language]) {
    const base = preferred?.toLowerCase().split('-')[0];
    const match = LANGUAGES.find((l) => l.code === base);
    if (match) return match.code;
  }
  return DEFAULT_LANG;
}

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Lang>(detectLanguage);

  useEffect(() => {
    const info = languageInfo(lang);
    const t = dictionaries[lang];
    const root = document.documentElement;
    root.lang = lang;
    root.dir = info.dir;
    loadScriptFont(lang);
    document.title = t.meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', t.meta.description);
  }, [lang]);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    storage.set(STORAGE_KEY, next);
    // Keep shared links language-neutral unless the visitor arrived with ?lang=.
    const url = new URL(window.location.href);
    if (url.searchParams.has('lang')) {
      url.searchParams.set('lang', next);
      history.replaceState(null, '', url);
    }
  }, []);

  const value = useMemo(
    () => ({ lang, info: languageInfo(lang), setLang, t: dictionaries[lang], posts: postTexts[lang] }),
    [lang, setLang],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};
