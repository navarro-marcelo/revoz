import { useState, useCallback } from 'react';
import {
  loadSettings,
  saveSettings,
  defaultSettings,
} from '../utils/storageManager';
import type { AppSettings } from '../utils/storageManager';

export function useSettings() {
  const [settings, setSettings] = useState<AppSettings>(loadSettings);

  const updateSettings = useCallback((partial: Partial<AppSettings>) => {
    setSettings((prev) => {
      const next = { ...prev, ...partial };
      saveSettings(next);
      return next;
    });
  }, []);

  const resetSettings = useCallback(() => {
    setSettings({ ...defaultSettings });
    saveSettings({ ...defaultSettings });
  }, []);

  return { settings, updateSettings, resetSettings };
}
