import { useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { storage, StorageKeys } from '../utils/storage';
import { COLORS } from '../constants/theme';

type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeState {
  mode: ThemeMode;
  colors: typeof COLORS;
}

export const useTheme = () => {
  const systemColorScheme = useColorScheme();
  const [theme, setTheme] = useState<ThemeState>({
    mode: 'system',
    colors: COLORS,
  });

  useEffect(() => {
    loadThemePreference();
  }, []);

  const loadThemePreference = async () => {
    try {
      const savedTheme = await storage.getItem<ThemeMode>(StorageKeys.THEME);
      if (savedTheme) {
        setTheme(prev => ({ ...prev, mode: savedTheme }));
      }
    } catch (error) {
      console.error('Error loading theme preference:', error);
    }
  };

  const setThemeMode = async (mode: ThemeMode) => {
    try {
      await storage.setItem(StorageKeys.THEME, mode);
      setTheme(prev => ({ ...prev, mode }));
    } catch (error) {
      console.error('Error saving theme preference:', error);
    }
  };

  const isDarkMode = theme.mode === 'system' 
    ? systemColorScheme === 'dark'
    : theme.mode === 'dark';

  return {
    theme: {
      ...theme,
      isDarkMode,
    },
    setThemeMode,
  };
}; 