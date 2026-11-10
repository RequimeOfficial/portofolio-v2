import React, { useState } from 'react';
import { motion } from 'framer-motion';

const techIcons = [
  { name: 'React', symbol: '⚛️' },
  { name: 'Node.js', symbol: '🟢' },
  { name: 'Unity', symbol: '🎮' },
  { name: 'AI/ML', symbol: '🧠' },
  { name: 'JavaScript', symbol: '💛' },
  { name: 'TypeScript', symbol: '🔷' },
];

// Viewport-relative positions so icons stay inside the hero on any screen size.
const randomPath = () => ({
  from: { x: `${Math.random() * 85}vw`, y: `${Math.random() * 80}vh` },
  to: { x: `${Math.random() * 85}vw`, y: `${Math.random() * 80}vh` },
});

const FloatingTechIcons: React.FC = () => {
  // Computed once, so parent re-renders don't make the icons jump.
  const [paths] = useState(() => techIcons.map(randomPath));

  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden pointer-events-none motion-reduce:hidden">
      {techIcons.map((tech, index) => (
        <motion.div
          key={tech.name}
          className="absolute top-0 left-0 text-3xl md:text-4xl"
          initial={{ ...paths[index]!.from, opacity: 0 }}
          animate={{ ...paths[index]!.to, opacity: 0.25, rotate: [0, 360] }}
          transition={{
            duration: 20 + index * 2,
            delay: index * 0.5,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'linear',
          }}
        >
          {tech.symbol}
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingTechIcons;
