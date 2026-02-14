export type VoiceProvider = 'browser' | 'elevenlabs';
export type ElevenLabsVoiceSource = 'prebuilt' | 'custom';

export interface AppSettings {
  voiceSpeed: number;
  pitch: number;
  fontSize: number;
  keySound: boolean;
  voiceProvider: VoiceProvider;
  elevenLabsVoiceId: string;
  elevenLabsVoiceName: string;
  elevenLabsVoiceSource: ElevenLabsVoiceSource;
  elevenLabsCustomVoiceId: string;
  elevenLabsCustomVoiceName: string;
  elevenLabsModelId: string;
}

const SETTINGS_KEY = 'revoz-settings';
const RECENT_KEY = 'revoz-recent-phrases';
const USER_DICT_KEY = 'revoz-user-dictionary';
const SAVED_PHRASES_KEY = 'revoz-saved-phrases';

export const defaultSettings: AppSettings = {
  voiceSpeed: 0.85,
  pitch: 1.0,
  fontSize: 1,
  keySound: true,
  voiceProvider: 'browser',
  elevenLabsVoiceId: '',
  elevenLabsVoiceName: '',
  elevenLabsVoiceSource: 'prebuilt',
  elevenLabsCustomVoiceId: '',
  elevenLabsCustomVoiceName: '',
  elevenLabsModelId: 'eleven_multilingual_v2',
};

export function loadSettings(): AppSettings {
  try {
    const stored = localStorage.getItem(SETTINGS_KEY);
    if (stored) {
      return { ...defaultSettings, ...JSON.parse(stored) };
    }
  } catch {
    // ignore parse errors
  }
  return { ...defaultSettings };
}

export function saveSettings(settings: AppSettings): void {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch {
    // ignore storage errors
  }
}

export function loadRecentPhrases(): string[] {
  try {
    const stored = localStorage.getItem(RECENT_KEY);
    if (stored) return JSON.parse(stored);
  } catch {
    // ignore
  }
  return [];
}

export function saveRecentPhrase(phrase: string): void {
  try {
    const recent = loadRecentPhrases();
    const filtered = recent.filter((p) => p !== phrase);
    filtered.unshift(phrase);
    const trimmed = filtered.slice(0, 20);
    localStorage.setItem(RECENT_KEY, JSON.stringify(trimmed));
  } catch {
    // ignore
  }
}

export interface UserWord {
  word: string;
  frequency: number;
}

export function loadUserDictionary(): UserWord[] {
  try {
    const stored = localStorage.getItem(USER_DICT_KEY);
    if (stored) return JSON.parse(stored);
  } catch {
    // ignore
  }
  return [];
}

export function saveUserWord(word: string): void {
  try {
    const dict = loadUserDictionary();
    const existing = dict.find((w) => w.word === word);
    if (existing) {
      existing.frequency = Math.min(existing.frequency + 5, 80);
    } else {
      dict.push({ word, frequency: 50 });
    }
    // Keep max 500 user words
    const trimmed = dict.slice(-500);
    localStorage.setItem(USER_DICT_KEY, JSON.stringify(trimmed));
  } catch {
    // ignore
  }
}

export function loadSavedPhrases(): string[] {
  try {
    const stored = localStorage.getItem(SAVED_PHRASES_KEY);
    if (stored) return JSON.parse(stored);
  } catch {
    // ignore
  }
  return [];
}

export function savePhraseToBank(phrase: string): void {
  try {
    const phrases = loadSavedPhrases();
    if (phrases.includes(phrase)) return;
    phrases.unshift(phrase);
    const trimmed = phrases.slice(0, 50);
    localStorage.setItem(SAVED_PHRASES_KEY, JSON.stringify(trimmed));
  } catch {
    // ignore
  }
}

export function deleteSavedPhrase(phrase: string): void {
  try {
    const phrases = loadSavedPhrases().filter((p) => p !== phrase);
    localStorage.setItem(SAVED_PHRASES_KEY, JSON.stringify(phrases));
  } catch {
    // ignore
  }
}
