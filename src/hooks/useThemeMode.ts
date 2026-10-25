import { useState, useEffect, useCallback } from 'react';

export type ThemeMode = 'dark' | 'light';

export function useThemeMode() {
  const [mode, setMode] = useState<ThemeMode>(() => {
    if (typeof document !== 'undefined' && document.documentElement.classList.contains('light')) {
      return 'light';
    }
    const saved = typeof localStorage !== 'undefined' ? localStorage.getItem('convertflow-theme-mode') : null;
    if (saved === 'dark' || saved === 'light') return saved;
    return 'dark'; // Default dark mode as per high-tech event theme
  });

  // Sync state if html class changes (e.g. from header or toggler)
  useEffect(() => {
    const root = document.documentElement;

    const observer = new MutationObserver(() => {
      const isCurrentlyDark = root.classList.contains('dark') || !root.classList.contains('light');
      setMode(isCurrentlyDark ? 'dark' : 'light');
    });

    observer.observe(root, { attributes: true, attributeFilter: ['class'] });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (mode === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
    }
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('convertflow-theme-mode', mode);
    }
  }, [mode]);

  const toggleMode = useCallback((newMode?: ThemeMode) => {
    if (newMode) {
      setMode(newMode);
    } else {
      setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
    }
  }, []);

  return { mode, toggleMode, isDark: mode === 'dark' };
}
