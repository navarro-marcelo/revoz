import { useState, useEffect, useCallback, useRef } from 'react';
import type { AppSettings } from '../utils/storageManager';
import { synthesizeSpeech } from '../services/elevenLabsApi';

export function useSpeech(settings: AppSettings) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceReady, setVoiceReady] = useState(false);
  const voiceRef = useRef<SpeechSynthesisVoice | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const blobUrlRef = useRef<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  // Always pick a Web Speech voice (fallback must always be ready)
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

  function cleanupAudio() {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    if (blobUrlRef.current) {
      URL.revokeObjectURL(blobUrlRef.current);
      blobUrlRef.current = null;
    }
  }

  const speakWebSpeech = useCallback(
    (text: string) => {
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

  const speakElevenLabs = useCallback(
    async (text: string): Promise<boolean> => {
      const voiceId =
        settings.elevenLabsVoiceSource === 'custom'
          ? settings.elevenLabsCustomVoiceId
          : settings.elevenLabsVoiceId;

      if (!voiceId) return false;

      try {
        abortRef.current = new AbortController();

        const blob = await synthesizeSpeech(
          text,
          voiceId,
          settings.elevenLabsModelId,
          abortRef.current.signal
        );

        cleanupAudio();
        const url = URL.createObjectURL(blob);
        blobUrlRef.current = url;

        const audio = new Audio(url);
        audioRef.current = audio;

        audio.onended = () => {
          setIsSpeaking(false);
          cleanupAudio();
        };
        audio.onerror = () => {
          setIsSpeaking(false);
          cleanupAudio();
        };

        await audio.play();
        return true;
      } catch (err) {
        cleanupAudio();
        if (err instanceof DOMException && err.name === 'AbortError') {
          return true; // User cancelled — not a failure
        }
        console.warn('ElevenLabs TTS failed, falling back to Web Speech:', err);
        return false;
      }
    },
    [
      settings.elevenLabsVoiceSource,
      settings.elevenLabsVoiceId,
      settings.elevenLabsCustomVoiceId,
      settings.elevenLabsModelId,
    ]
  );

  const speak = useCallback(
    (text: string) => {
      if (!text.trim()) return;

      if (settings.voiceProvider === 'elevenlabs') {
        setIsSpeaking(true);
        speakElevenLabs(text).then((success) => {
          if (!success) {
            speakWebSpeech(text);
          }
        });
      } else {
        speakWebSpeech(text);
      }
    },
    [settings.voiceProvider, speakElevenLabs, speakWebSpeech]
  );

  const stop = useCallback(() => {
    // Cancel ElevenLabs fetch if in progress
    if (abortRef.current) {
      abortRef.current.abort();
      abortRef.current = null;
    }
    // Stop ElevenLabs audio playback
    cleanupAudio();
    // Stop Web Speech
    speechSynthesis.cancel();
    setIsSpeaking(false);
  }, []);

  return { speak, stop, isSpeaking, voiceReady };
}
