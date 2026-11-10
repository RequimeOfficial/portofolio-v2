import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, Sun, Moon, Volume2, VolumeX } from 'lucide-react';
import { useTheme } from '../contexts/theme';
import { useMusic } from '../contexts/music';
import { useActiveSection } from '../hooks/useActiveSection';
import { navItems, profile } from '../data/profile';
import { scrollToSection } from '../lib/utils';

const sectionIds = navItems.map((item) => item.id);

const iconButton =
  'p-2 rounded-lg bg-gray-200/80 dark:bg-dark-secondary text-gray-700 dark:text-gray-300 hover:text-neon-blue dark:hover:text-neon-blue transition-colors duration-200';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const { isPlaying, toggleMusic, isSupported } = useMusic();
  const active = useActiveSection(sectionIds);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setIsOpen(false);
    const onResize = () => window.innerWidth >= 1024 && setIsOpen(false);
    document.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    return () => {
      document.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
    };
  }, [isOpen]);

  const go = (id: string) => {
    setIsOpen(false);
    scrollToSection(id);
  };

  const solid = scrolled || isOpen;

  return (
    <motion.nav
      aria-label="Main navigation"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        solid ? 'bg-white/85 dark:bg-dark-primary/90 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              go('home');
            }}
            className="flex items-center gap-2 min-w-0 text-lg sm:text-xl font-poppins font-bold text-gray-900 dark:text-white"
            aria-label={`${profile.name} — back to top`}
          >
            <img src={profile.avatar} alt="" className="w-9 h-9 rounded-full object-cover ring-2 ring-neon-blue/60" />
            <span className="truncate xl:hidden">
              <span className="text-neon-blue">R</span>obbiyal <span className="text-neon-purple">A</span>qla
            </span>
            <span className="truncate hidden xl:inline">
              <span className="text-neon-blue">A</span>hmad Mofidur <span className="text-neon-purple">R</span>obbiyal
              Aqla
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => go(item.id)}
                aria-current={active === item.id ? 'true' : undefined}
                className={`relative px-2.5 xl:px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  active === item.id
                    ? 'text-neon-blue'
                    : 'text-gray-700 dark:text-gray-300 hover:text-neon-blue dark:hover:text-neon-blue'
                }`}
              >
                {item.name}
                {active === item.id && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute left-2 right-2 -bottom-0.5 h-0.5 rounded-full bg-gradient-to-r from-neon-blue to-neon-purple"
                  />
                )}
              </button>
            ))}
          </div>

          {/* Theme & Music Controls */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <motion.button
              type="button"
              onClick={toggleTheme}
              className={iconButton}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              title={isDark ? 'Light mode' : 'Dark mode'}
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </motion.button>

            {isSupported && (
              <motion.button
                type="button"
                onClick={toggleMusic}
                className={iconButton}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label={isPlaying ? 'Pause background music' : 'Play background music'}
                aria-pressed={isPlaying}
                title={isPlaying ? 'Pause music' : 'Play music'}
              >
                {isPlaying ? <Volume2 size={20} /> : <VolumeX size={20} />}
              </motion.button>
            )}

            <motion.button
              type="button"
              onClick={() => setIsOpen((open) => !open)}
              className={`lg:hidden ${iconButton}`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            className="lg:hidden border-t border-gray-200/60 dark:border-white/10"
            // Animate transform/opacity only: animating `height: 'auto'` makes Framer Motion
            // restore the scroll position, which cancels the smooth scroll to the tapped section.
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
          >
            <div className="px-4 pt-2 pb-4 space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => go(item.id)}
                  aria-current={active === item.id ? 'true' : undefined}
                  className={`block w-full text-left px-3 py-2.5 rounded-md text-base font-medium transition-colors duration-200 ${
                    active === item.id
                      ? 'text-neon-blue bg-neon-blue/10'
                      : 'text-gray-700 dark:text-gray-300 hover:text-neon-blue hover:bg-gray-100 dark:hover:bg-white/5'
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
