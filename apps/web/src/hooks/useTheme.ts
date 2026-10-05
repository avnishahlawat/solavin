import { useState, useEffect, useCallback } from 'react';

export type UiTheme = 'dark' | 'light' | 'bw';

const THEME_STORAGE_KEY = 'solavin_ui_theme';

export function useTheme() {
  const [theme, setThemeState] = useState<UiTheme>(() => {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    if (saved === 'light' || saved === 'bw' || saved === 'dark') {
      return saved as UiTheme;
    }
    return 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  const setTheme = useCallback((newTheme: UiTheme) => {
    setThemeState(newTheme);
  }, []);

  const cycleTheme = useCallback(() => {
    setThemeState((prev) => {
      if (prev === 'dark') return 'light';
      if (prev === 'light') return 'bw';
      return 'dark';
    });
  }, []);

  return { theme, setTheme, cycleTheme };
}
