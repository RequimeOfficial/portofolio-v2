import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
}

const LINK_DISTANCE = 110;

const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let particles: Particle[] = [];
    let frameId = 0;
    let width = 0;
    let height = 0;

    const setup = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Fewer particles on small screens keeps it smooth on phones.
      const count = Math.round(Math.min(60, Math.max(20, (width * height) / 25000)));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.1,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]!;
        if (!reduceMotion) {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0 || p.x > width) p.vx *= -1;
          if (p.y < 0 || p.y > height) p.vy *= -1;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 209, 255, ${p.opacity})`;
        ctx.fill();

        // Each pair is connected once (j > i) instead of twice.
        for (let j = i + 1; j < particles.length; j++) {
          const o = particles[j]!;
          const dx = p.x - o.x;
          const dy = p.y - o.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < LINK_DISTANCE * LINK_DISTANCE) {
            const distance = Math.sqrt(distSq);
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(o.x, o.y);
            ctx.strokeStyle = `rgba(0, 209, 255, ${0.12 * (1 - distance / LINK_DISTANCE)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
    };

    const loop = () => {
      draw();
      frameId = requestAnimationFrame(loop);
    };

    const start = () => {
      cancelAnimationFrame(frameId);
      if (reduceMotion) draw();
      else frameId = requestAnimationFrame(loop);
    };

    let resizeTimer = 0;
    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        setup();
        start();
      }, 150);
    };

    // Pause while the tab is hidden to save battery.
    const onVisibility = () => {
      if (document.hidden) cancelAnimationFrame(frameId);
      else start();
    };

    setup();
    start();
    window.addEventListener('resize', onResize);
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      cancelAnimationFrame(frameId);
      window.clearTimeout(resizeTimer);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className="fixed inset-0 pointer-events-none z-0 opacity-30" />;
};

export default ParticleBackground;
