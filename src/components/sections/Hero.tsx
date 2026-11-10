import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Download } from 'lucide-react';
import FloatingTechIcons from '../FloatingTechIcons';
import { profile, socialLinks } from '../../data/profile';
import { prefersReducedMotion, scrollToSection } from '../../lib/utils';

const roleColors = ['text-neon-blue', 'text-neon-purple', 'text-neon-green'];

const Hero: React.FC = () => {
  const fullText = profile.name;
  const [text, setText] = useState(() => (prefersReducedMotion() ? fullText : ''));
  const done = text.length === fullText.length;

  useEffect(() => {
    if (done) return;
    let index = text.length;
    const timer = window.setInterval(() => {
      index++;
      setText(fullText.slice(0, index));
      if (index >= fullText.length) window.clearInterval(timer);
    }, 70);
    return () => window.clearInterval(timer);
    // Only run once on mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const reveal = (delay: number) => ({
    initial: { opacity: 0, y: 20 },
    animate: done ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 },
    transition: { duration: 0.7, delay: done ? delay : 0 },
  });

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16">
      <FloatingTechIcons />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 py-16">
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-poppins font-bold text-gray-900 dark:text-white mb-6 leading-tight">
          <span className="sr-only">{fullText}</span>
          {/* Invisible copy reserves the final size so nothing jumps while typing. */}
          <span aria-hidden="true" className="relative inline-block">
            <span className="invisible">{fullText}</span>
            <span className="absolute inset-0">
              {text}
              {/* Zero-width wrapper so the caret can never push text onto a new line. */}
              <span className="relative inline-block w-0 h-[0.9em] -mb-[0.1em]">
                <span className="absolute left-1 top-0 w-[3px] h-full bg-neon-blue animate-pulse" />
              </span>
            </span>
          </span>
        </h1>

        {/* Content is always rendered (only faded) so the layout doesn't shift when typing ends. */}
        <motion.div {...reveal(0)} className="space-y-4 mb-10">
          <p className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xl sm:text-2xl md:text-3xl font-inter">
            {profile.roles.map((role, i) => (
              <React.Fragment key={role}>
                {i > 0 && (
                  <span className="hidden sm:inline text-gray-400" aria-hidden="true">
                    |
                  </span>
                )}
                <span className={`${roleColors[i % roleColors.length]} whitespace-nowrap`}>{role}</span>
              </React.Fragment>
            ))}
          </p>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">"{profile.tagline}"</p>
        </motion.div>

        <motion.div {...reveal(0.2)} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
          <motion.button
            type="button"
            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-neon-blue to-neon-purple text-white font-semibold rounded-lg shadow-lg"
            whileHover={{ scale: 1.05, boxShadow: '0 0 25px rgba(0, 209, 255, 0.5)' }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollToSection('projects')}
          >
            Explore My Work
          </motion.button>

          <motion.a
            href={profile.cvUrl}
            download
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 border-2 border-neon-blue text-neon-blue font-semibold rounded-lg hover:bg-neon-blue hover:text-white transition-colors duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Download className="mr-2" size={20} />
            Download CV
          </motion.a>
        </motion.div>

        <motion.div {...reveal(0.4)} className="flex items-center justify-center gap-4 sm:gap-6 mb-12">
          {socialLinks.map(({ icon: Icon, href, label }) => (
            <motion.a
              key={label}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
              aria-label={label}
              title={label}
              className="p-3 rounded-full bg-gray-200 dark:bg-dark-secondary text-gray-700 dark:text-gray-300 hover:text-neon-blue dark:hover:text-neon-blue hover:bg-gray-300 dark:hover:bg-dark-accent transition-colors duration-300"
              whileHover={{ scale: 1.1, y: -5 }}
              whileTap={{ scale: 0.9 }}
            >
              <Icon size={24} />
            </motion.a>
          ))}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.button
          type="button"
          onClick={() => scrollToSection('about')}
          className="text-gray-400 hover:text-neon-blue transition-colors duration-300"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          aria-label="Scroll to About section"
        >
          <ChevronDown size={32} />
        </motion.button>
      </motion.div>
    </section>
  );
};

export default Hero;
