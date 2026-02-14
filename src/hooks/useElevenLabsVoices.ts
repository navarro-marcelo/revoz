import { useState, useEffect } from 'react';
import {
  isElevenLabsConfigured,
  fetchVoices,
  type ElevenLabsVoiceInfo,
} from '../services/elevenLabsApi';

export function useElevenLabsVoices() {
  const configured = isElevenLabsConfigured();
  const [voices, setVoices] = useState<ElevenLabsVoiceInfo[]>([]);
  const [loading, setLoading] = useState(configured);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!configured) return;

    let cancelled = false;

    fetchVoices()
      .then((result) => {
        if (!cancelled) setVoices(result);
      })
      .catch((err) => {
        if (!cancelled) setError(err.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [configured]);

  return { voices, loading, error };
}
