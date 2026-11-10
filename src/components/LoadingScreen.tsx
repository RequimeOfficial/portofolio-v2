import React from 'react';
import { motion } from 'framer-motion';
import { profile } from '../data/profile';

const LoadingScreen: React.FC = () => (
  <motion.div
    className="fixed inset-0 bg-dark-primary flex items-center justify-center z-[70] px-4"
    initial={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.5 }}
    role="status"
    aria-live="polite"
  >
    <div className="text-center">
      <motion.div
        className="w-16 h-16 md:w-20 md:h-20 border-4 border-neon-blue border-t-transparent rounded-full mx-auto mb-8"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      />

      <motion.p
        className="text-2xl sm:text-3xl md:text-4xl font-poppins font-bold text-white mb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {profile.name}
      </motion.p>

      <motion.p
        className="text-neon-blue font-inter"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Loading Portfolio...
      </motion.p>

      <div className="w-48 sm:w-64 h-1 bg-dark-secondary rounded-full mx-auto mt-8 overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-neon-blue to-neon-purple rounded-full"
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 1.1, ease: 'easeInOut' }}
        />
      </div>
    </div>
  </motion.div>
);

export default LoadingScreen;
