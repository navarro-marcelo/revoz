import { useState, useEffect, useCallback, useRef } from 'react';
import type { AppSettings } from '../utils/storageManager';

export function useSpeech(settings: AppSettings) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceReady, setVoiceReady] = useState(false);
  const voiceRef = useRef<SpeechSynthesisVoice | null>(null);

  useEffect(() => {
    function pickVoice() {
      const voices = speechSynthesis.getVoices();
      if (!voices.length) return;

      const localPtBR = voices.find(
        (v) => v.lang === 'pt-BR' && v.localService
      );
      const anyPtBR = voices.find((v) => v.lang === 'pt-BR');
      const localPt = voices.find(
        (v) => v.lang.startsWith('pt') && v.localService
      );
      const anyPt = voices.find((v) => v.lang.startsWith('pt'));

      voiceRef.current = localPtBR || anyPtBR || localPt || anyPt || null;
      setVoiceReady(true);
    }

    pickVoice();
    speechSynthesis.addEventListener('voiceschanged', pickVoice);
    return () => {
      speechSynthesis.removeEventListener('voiceschanged', pickVoice);
    };
  }, []);

  const speak = useCallback(
    (text: string) => {
      if (!text.trim()) return;
      speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = settings.voiceSpeed;
      utterance.pitch = settings.pitch;
      if (voiceRef.current) {
        utterance.voice = voiceRef.current;
      }
      utterance.lang = 'pt-BR';

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      speechSynthesis.speak(utterance);
    },
    [settings.voiceSpeed, settings.pitch]
  );

  const stop = useCallback(() => {
    speechSynthesis.cancel();
    setIsSpeaking(false);
  }, []);

  return { speak, stop, isSpeaking, voiceReady };
}
