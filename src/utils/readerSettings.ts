import { storage } from './storage';
import { StorageKeys } from '../constants/storage';

export interface ReaderSettings {
  fontSize: number;
  theme: 'light' | 'dark' | 'sepia';
  scrollMode: 'scroll' | 'page';
}

const DEFAULT_SETTINGS: ReaderSettings = {
  fontSize: 16,
  theme: 'light',
  scrollMode: 'scroll',
};

export const readerSettings = {
  async getSettings(): Promise<ReaderSettings> {
    try {
      const settings = await storage.getItem<ReaderSettings>(StorageKeys.SETTINGS);
      return settings || DEFAULT_SETTINGS;
    } catch (error) {
      console.error('Error getting reader settings:', error);
      return DEFAULT_SETTINGS;
    }
  },

  async updateSettings(settings: Partial<ReaderSettings>): Promise<void> {
    try {
      const currentSettings = await this.getSettings();
      const updatedSettings = { ...currentSettings, ...settings };
      await storage.setItem(StorageKeys.SETTINGS, updatedSettings);
    } catch (error) {
      console.error('Error updating reader settings:', error);
      throw error;
    }
  },

  async updateFontSize(fontSize: number): Promise<void> {
    await this.updateSettings({ fontSize });
  },

  async updateTheme(theme: 'light' | 'dark' | 'sepia'): Promise<void> {
    await this.updateSettings({ theme });
  },

  async updateScrollMode(scrollMode: 'scroll' | 'page'): Promise<void> {
    await this.updateSettings({ scrollMode });
  },
}; 