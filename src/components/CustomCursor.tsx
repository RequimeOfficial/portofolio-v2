import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const INTERACTIVE = 'a, button, input, textarea, select, label, [role="button"], [data-cursor="hover"]';

/** Only enable the custom cursor on devices with a precise pointer (not touch screens). */
const canUseCustomCursor = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
  !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const CustomCursor: React.FC = () => {
  const [enabled] = useState(canUseCustomCursor);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Motion values update without re-rendering React on every mouse move.
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const dotX = useSpring(x, { stiffness: 1000, damping: 50, mass: 0.2 });
  const dotY = useSpring(y, { stiffness: 1000, damping: 50, mass: 0.2 });
  const ringX = useSpring(x, { stiffness: 250, damping: 25 });
  const ringY = useSpring(y, { stiffness: 250, damping: 25 });

  useEffect(() => {
    if (!enabled) return;
    const root = document.documentElement;
    root.classList.add('custom-cursor');

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setIsVisible(true);
    };
    // Event delegation: also works for elements rendered after mount.
    const onOver = (e: MouseEvent) => {
      const target = e.target as Element | null;
      setIsHovering(!!target?.closest?.(INTERACTIVE));
    };
    const onLeave = () => setIsVisible(false);

    document.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseover', onOver, { passive: true });
    root.addEventListener('mouseleave', onLeave);

    return () => {
      root.classList.remove('custom-cursor');
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      root.removeEventListener('mouseleave', onLeave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <div aria-hidden="true" className={`transition-opacity duration-200 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 -ml-1.5 -mt-1.5 bg-neon-blue rounded-full pointer-events-none z-[9999]"
        style={{ x: dotX, y: dotY }}
        animate={{ scale: isHovering ? 0.5 : 1 }}
      />
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 -ml-4 -mt-4 border-2 border-neon-blue rounded-full pointer-events-none z-[9998]"
        style={{ x: ringX, y: ringY }}
        animate={{ scale: isHovering ? 1.6 : 1, opacity: isHovering ? 0.9 : 0.5 }}
        transition={{ duration: 0.2 }}
      />
    </div>
  );
};

export default CustomCursor;
