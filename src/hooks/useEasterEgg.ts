import { useCallback, useEffect, useRef, useState } from 'react';
import { profile, socialLinks } from '../data/profile';
import { useTheme } from '../contexts/theme';
import { useMusic } from '../contexts/music';
import { scrollToSection } from '../lib/utils';
import { useI18n } from '../contexts/language';
import { LANGUAGES, isLang } from '../i18n';

const KONAMI = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a',
];

const WELCOME = [`> Welcome to ${profile.brand}'s secret console! 🎮`, '> Type "help" to see what you can do.'];

const HELP = [
  '> Available commands:',
  '  help      Show this help',
  '  about     About this portfolio',
  '  whoami    Who built this site',
  '  socials   Where to find me',
  '  game      Play "guess the number"',
  '  theme     Toggle light / dark mode',
  '  lang <code>  Switch language (en, id, ja, ar)',
  '  music     Play / pause the background music',
  '  goto <section>  Jump to a section (about, skills, projects, blog, contact...)',
  '  konami    A little gaming history',
  '  clear     Clear the console',
  '  exit      Close the console',
];

export const useEasterEgg = () => {
  const [showConsole, setShowConsole] = useState(false);
  const [commands, setCommands] = useState<string[]>([]);
  const [partyMode, setPartyMode] = useState(false);
  const secretRef = useRef<number | null>(null);
  const attemptsRef = useRef(0);
  const { toggleTheme, isDark } = useTheme();
  const { toggleMusic, isPlaying } = useMusic();
  const { t, lang, setLang } = useI18n();

  const print = useCallback((...lines: string[]) => setCommands((prev) => [...prev, ...lines]), []);

  const openConsole = useCallback(() => {
    setShowConsole((wasOpen) => {
      if (!wasOpen) setCommands(WELCOME);
      return true;
    });
  }, []);

  const closeConsole = useCallback(() => {
    setShowConsole(false);
    setCommands([]);
    secretRef.current = null;
  }, []);

  // Ctrl+Alt+A opens the console; the Konami code triggers party mode.
  useEffect(() => {
    let progress = 0;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.altKey && e.code === 'KeyA') {
        e.preventDefault();
        openConsole();
        return;
      }
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) return;

      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      progress = key === KONAMI[progress] ? progress + 1 : key === KONAMI[0] ? 1 : 0;
      if (progress === KONAMI.length) {
        progress = 0;
        setPartyMode(true);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [openConsole]);

  useEffect(() => {
    if (!partyMode) return;
    document.documentElement.classList.add('party-mode');
    const id = window.setTimeout(() => setPartyMode(false), 6000);
    return () => {
      window.clearTimeout(id);
      document.documentElement.classList.remove('party-mode');
    };
  }, [partyMode]);

  const executeCommand = useCallback(
    (input: string) => {
      const raw = input.trim();
      const [cmd = '', ...args] = raw.toLowerCase().split(/\s+/);
      print(`$ ${raw}`);

      // While a game is running, numbers are treated as guesses.
      if (secretRef.current !== null && /^\d+$/.test(cmd)) {
        const guess = Number(cmd);
        attemptsRef.current++;
        if (guess === secretRef.current) {
          print(
            `> 🎉 Correct! The number was ${guess}. You needed ${attemptsRef.current} attempt(s).`,
            '> Type "game" to play again.',
          );
          secretRef.current = null;
        } else {
          print(guess < secretRef.current ? '> ⬆️  Higher!' : '> ⬇️  Lower!');
        }
        return;
      }

      switch (cmd) {
        case 'help':
          print(...HELP);
          break;
        case 'about':
          print('> This portfolio was built with React, TypeScript, Tailwind CSS, Framer Motion and lots of ☕');
          break;
        case 'whoami':
          print(`> ${profile.name} (${profile.brand})`, `> ${t.hero.roles.join(' · ')} — ${t.about.location}`);
          break;
        case 'socials':
          print(...socialLinks.map((s) => `  ${s.label.padEnd(10)} ${s.href.replace(/^mailto:/, '')}`));
          break;
        case 'game':
        case 'games':
          secretRef.current = Math.floor(Math.random() * 100) + 1;
          attemptsRef.current = 0;
          print("> 🎮 I'm thinking of a number between 1 and 100.", '> Type your guess and press Enter!');
          break;
        case 'lang':
        case 'language': {
          const code = args[0];
          if (isLang(code)) {
            setLang(code);
            print(`> 🌐 Language: ${LANGUAGES.find((l) => l.code === code)!.label}`);
          } else {
            print(
              `> Current: ${lang}. Usage: lang <${LANGUAGES.map((l) => l.code).join('|')}>`,
              ...LANGUAGES.map((l) => `  ${l.code}  ${l.label}`),
            );
          }
          break;
        }
        case 'theme':
          toggleTheme();
          print(`> Switched to ${isDark ? 'light' : 'dark'} mode.`);
          break;
        case 'music':
          toggleMusic();
          print(isPlaying ? '> ⏸  Music paused.' : '> 🎵 Music playing.');
          break;
        case 'goto': {
          const target = args[0] === 'ai' ? 'ai-section' : args[0] === 'home' ? 'home' : args[0];
          if (target && document.getElementById(target)) {
            print(`> Jumping to #${target}...`);
            setTimeout(() => {
              closeConsole();
              scrollToSection(target);
            }, 400);
          } else {
            print('> Usage: goto <home|about|skills|projects|ai|testimonials|blog|contact>');
          }
          break;
        }
        case 'konami':
          print('> ↑ ↑ ↓ ↓ ← → ← → B A', '> Classic! Close the console and type it on the page for a surprise 🕹️');
          break;
        case 'sudo':
          print('> Nice try. 😄 Permission denied.');
          break;
        case 'clear':
          setCommands([]);
          break;
        case 'exit':
        case 'quit':
          closeConsole();
          break;
        default:
          print(`> Command not found: ${raw}`, '> Type "help" for available commands');
      }
    },
    [print, toggleTheme, isDark, toggleMusic, isPlaying, closeConsole, t, lang, setLang],
  );

  return { showConsole, commands, executeCommand, closeConsole, openConsole };
};
