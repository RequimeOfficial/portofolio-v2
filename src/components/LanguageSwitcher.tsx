import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, Globe } from 'lucide-react';
import { LANGUAGES } from '../i18n';
import { useI18n } from '../contexts/language';

interface LanguageSwitcherProps {
  /** `menu` = globe button with dropdown (navbar), `inline` = row of pills (mobile menu). */
  variant?: 'menu' | 'inline';
  onSelect?: () => void;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ variant = 'menu', onSelect }) => {
  const { lang, info, setLang, t } = useI18n();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('pointerdown', onPointer);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onPointer);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const choose = (code: (typeof LANGUAGES)[number]['code']) => {
    setLang(code);
    setOpen(false);
    onSelect?.();
  };

  if (variant === 'inline') {
    return (
      <div role="group" aria-label={t.nav.chooseLanguage} className="grid grid-cols-2 gap-2">
        {LANGUAGES.map((l) => (
          <button
            key={l.code}
            type="button"
            lang={l.code}
            onClick={() => choose(l.code)}
            aria-pressed={lang === l.code}
            className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              lang === l.code
                ? 'bg-gradient-to-r from-neon-blue to-neon-purple text-white'
                : 'bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-gray-300 hover:text-neon-blue'
            }`}
          >
            <span className="text-xs font-bold opacity-80 w-6">{l.short}</span>
            <span className="truncate">{l.label}</span>
          </button>
        ))}
      </div>
    );
  }

  return (
    <div ref={rootRef} className="relative">
      <motion.button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1.5 p-2 rounded-lg bg-gray-200/80 dark:bg-dark-secondary text-gray-700 dark:text-gray-300 hover:text-neon-blue dark:hover:text-neon-blue transition-colors duration-200"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`${t.nav.language}: ${info.label}`}
        title={t.nav.chooseLanguage}
      >
        <Globe size={20} />
        <span className="text-xs font-bold">{info.short}</span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            aria-label={t.nav.chooseLanguage}
            className="absolute end-0 mt-2 w-52 p-1.5 rounded-xl bg-white dark:bg-dark-secondary shadow-2xl border border-gray-200 dark:border-white/10 z-50"
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.15 }}
          >
            {LANGUAGES.map((l) => (
              <li key={l.code} role="option" aria-selected={lang === l.code}>
                <button
                  type="button"
                  lang={l.code}
                  onClick={() => choose(l.code)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                    lang === l.code
                      ? 'bg-neon-blue/10 text-neon-blue font-semibold'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5'
                  }`}
                >
                  <span className="text-[11px] font-bold w-7 h-6 rounded-md flex items-center justify-center bg-gray-100 dark:bg-white/10">
                    {l.short}
                  </span>
                  <span className="flex-1 text-start">{l.label}</span>
                  {lang === l.code && <Check size={16} />}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageSwitcher;
