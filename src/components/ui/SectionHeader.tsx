import React from 'react';
import { motion } from 'framer-motion';

interface SectionHeaderProps {
  title: string;
  highlight: string;
  subtitle?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, highlight, subtitle }) => (
  <motion.div
    className="text-center mb-12 md:mb-16"
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    viewport={{ once: true }}
  >
    <h2 className="text-3xl sm:text-4xl md:text-5xl font-poppins font-bold text-gray-900 dark:text-white mb-4">
      {title} <span className="text-neon-blue">{highlight}</span>
    </h2>
    {subtitle && <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">{subtitle}</p>}
    <div className="w-24 h-1 bg-gradient-to-r from-neon-blue to-neon-purple mx-auto rounded-full mt-4" />
  </motion.div>
);

export default SectionHeader;
