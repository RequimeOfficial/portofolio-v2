import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { scrollToTop } from '../lib/utils';

const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => setIsVisible(window.scrollY > 400);
    toggleVisibility();
    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        // Bottom-left so it never collides with the music player on the right.
        <motion.button
          type="button"
          className="fixed bottom-4 left-4 z-40 p-3 bg-gradient-to-r from-neon-blue to-neon-purple text-white rounded-full shadow-lg"
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0, y: 20 }}
          whileHover={{ scale: 1.1, boxShadow: '0 0 25px rgba(0, 209, 255, 0.5)', y: -3 }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.3 }}
          aria-label="Scroll to top"
          title="Back to top"
        >
          <ArrowUp size={22} />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;
