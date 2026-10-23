import { useState, useEffect } from 'react';

export type ThemeMode = 'dark' | 'light';

export function useThemeMode() {
  const [mode, setMode] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem('convertflow-theme-mode');
    if (saved === 'dark' || saved === 'light') return saved;
    return 'dark'; // Default dark mode as per high-tech event theme
  });

  useEffect(() => {
    const root = document.documentElement;
    if (mode === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
    }
    localStorage.setItem('convertflow-theme-mode', mode);
  }, [mode]);

  const toggleMode = (newMode?: ThemeMode) => {
    if (newMode) {
      setMode(newMode);
    } else {
      setMode(prev => (prev === 'dark' ? 'light' : 'dark'));
    }
  };

  return { mode, toggleMode, isDark: mode === 'dark' };
}
