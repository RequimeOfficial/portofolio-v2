/** localStorage wrappers that never throw (private mode, blocked storage, SSR). */
export const storage = {
  get(key: string): string | null {
    try {
      return window.localStorage.getItem(key);
    } catch {
      return null;
    }
  },
  set(key: string, value: string) {
    try {
      window.localStorage.setItem(key, value);
    } catch {
      /* ignore */
    }
  },
  getJSON<T>(key: string, fallback: T): T {
    const raw = storage.get(key);
    if (!raw) return fallback;
    try {
      return JSON.parse(raw) as T;
    } catch {
      return fallback;
    }
  },
  setJSON(key: string, value: unknown) {
    storage.set(key, JSON.stringify(value));
  },
};

export function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/** Smoothly scrolls to a section by id (accepts "about" or "#about"). */
export function scrollToSection(id: string) {
  const el = document.getElementById(id.replace(/^#/, ''));
  if (!el) return;
  el.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' });
}

export function scrollToTop() {
  window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
}

export function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00`).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]!.toUpperCase())
    .join('');
}

/** Copies text to the clipboard, with a fallback for non-secure contexts. */
export async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand('copy');
    ta.remove();
    return ok;
  }
}
