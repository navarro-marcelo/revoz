import { useMemo, useRef, useState, useCallback } from 'react';
import { dictionary, buildPrefixIndex } from '../data/dictionary';
import type { DictionaryEntry } from '../data/dictionary';
import { buildBigramMap } from '../data/bigrams';
import {
  getCurrentPartialWord,
  getLastCompletedWord,
  normalize,
} from '../utils/textProcessor';
import { loadUserDictionary, saveUserWord } from '../utils/storageManager';
import { toAccented } from '../data/accentMap';

export function useAutocomplete(currentText: string) {
  const prefixIndex = useRef<Map<string, DictionaryEntry[]> | null>(null);
  const bigramMap = useRef<ReturnType<typeof buildBigramMap> | null>(null);
  const [userDictVersion, setUserDictVersion] = useState(0);

  if (!prefixIndex.current) {
    prefixIndex.current = buildPrefixIndex();
  }
  if (!bigramMap.current) {
    bigramMap.current = buildBigramMap();
  }

  const learnWord = useCallback((word: string) => {
    const normalized = normalize(word);
    if (normalized.length < 2) return;
    // Check if word already exists in main dictionary
    const exists = dictionary.some((e) => e.word === normalized);
    if (!exists) {
      saveUserWord(normalized);
      setUserDictVersion((v) => v + 1);
    }
  }, []);

  const suggestions = useMemo(() => {
    // Force recalculation when user dictionary changes
    void userDictVersion;

    const partial = normalize(getCurrentPartialWord(currentText));
    const lastWord = normalize(getLastCompletedWord(currentText));

    // No partial word: return bigram predictions based on last completed word
    if (!partial && lastWord) {
      const bigramEntries = bigramMap.current!.get(lastWord);
      if (bigramEntries) {
        return bigramEntries
          .sort((a, b) => b.score - a.score)
          .slice(0, 5)
          .map((b) => toAccented(b.second));
      }
      return [];
    }

    if (!partial) return [];

    // Find candidates by prefix from main dictionary
    const prefixKey = partial.slice(0, 4);
    let candidates: DictionaryEntry[] = [];

    for (let len = Math.min(4, prefixKey.length); len >= 1; len--) {
      const key = prefixKey.slice(0, len);
      const entries = prefixIndex.current!.get(key);
      if (entries) {
        candidates = entries.filter((e) => e.word.startsWith(partial));
        if (candidates.length > 0) break;
      }
    }

    if (candidates.length === 0) {
      candidates = dictionary.filter((e) => e.word.startsWith(partial));
    }

    // Add user dictionary words
    const userWords = loadUserDictionary();
    const userMatches = userWords
      .filter((w) => w.word.startsWith(partial))
      .map((w) => ({ word: w.word, frequency: w.frequency }));
    candidates = [...candidates, ...userMatches];

    // Apply bigram boost
    if (lastWord) {
      const bigramEntries = bigramMap.current!.get(lastWord);
      if (bigramEntries) {
        const bigramWords = new Set(bigramEntries.map((b) => b.second));
        candidates = candidates.map((c) => ({
          ...c,
          frequency: c.frequency + (bigramWords.has(c.word) ? 30 : 0),
        }));
      }
    }

    // Don't suggest the exact word already typed
    candidates = candidates.filter((c) => c.word !== partial);

    // Deduplicate by word, keeping highest frequency
    const seen = new Map<string, DictionaryEntry>();
    for (const c of candidates) {
      const existing = seen.get(c.word);
      if (!existing || c.frequency > existing.frequency) {
        seen.set(c.word, c);
      }
    }

    return [...seen.values()]
      .sort((a, b) => b.frequency - a.frequency)
      .slice(0, 5)
      .map((c) => toAccented(c.word));
  }, [currentText, userDictVersion]);

  return { suggestions, learnWord };
}
