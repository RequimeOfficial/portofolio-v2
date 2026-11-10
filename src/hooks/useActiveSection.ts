import { useEffect, useState } from 'react';

/** Returns the id of the section currently in the middle of the viewport. */
export const useActiveSection = (ids: readonly string[]) => {
  const [active, setActive] = useState(ids[0] ?? '');

  useEffect(() => {
    const elements = ids.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => !!el);
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      // A thin band around the vertical center of the screen.
      { rootMargin: '-45% 0px -50% 0px' },
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);

  return active;
};
