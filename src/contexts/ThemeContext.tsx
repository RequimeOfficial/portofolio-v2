import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ThemeContext } from './theme';
import { storage } from '../lib/utils';

// The initial class is applied by an inline script in index.html to avoid a flash of the wrong theme.
const getInitialTheme = () => document.documentElement.classList.contains('dark');

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDark, setIsDark] = useState(getInitialTheme);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', isDark);
    root.style.colorScheme = isDark ? 'dark' : 'light';
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', isDark ? '#0a192f' : '#ffffff');
  }, [isDark]);

  const toggleTheme = useCallback(() => {
    setIsDark((prev) => {
      storage.set('theme', prev ? 'light' : 'dark');
      return !prev;
    });
  }, []);

  const value = useMemo(() => ({ isDark, toggleTheme }), [isDark, toggleTheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};
