const API_BASE = 'https://api.elevenlabs.io';

export interface ElevenLabsVoiceInfo {
  voice_id: string;
  name: string;
  category: string;
  labels: Record<string, string>;
}

function getApiKey(): string {
  return import.meta.env.VITE_ELEVENLABS_API_KEY ?? '';
}

export function isElevenLabsConfigured(): boolean {
  return getApiKey().length > 0;
}

export async function fetchVoices(): Promise<ElevenLabsVoiceInfo[]> {
  const apiKey = getApiKey();
  if (!apiKey) return [];

  const res = await fetch(`${API_BASE}/v1/voices`, {
    headers: { 'xi-api-key': apiKey },
  });

  if (!res.ok) {
    throw new Error(`ElevenLabs API error: ${res.status}`);
  }

  const data = await res.json();
  const voices: ElevenLabsVoiceInfo[] = data.voices ?? [];

  return voices.filter((v) => {
    const lang = v.labels?.language ?? '';
    const accent = v.labels?.accent ?? '';
    const useCase = v.labels?.use_case ?? '';
    return (
      lang === 'pt' ||
      lang === 'Portuguese' ||
      lang === 'portuguese' ||
      accent.toLowerCase().includes('brazil') ||
      accent.toLowerCase().includes('brasil') ||
      useCase === 'multilingual' ||
      v.category === 'cloned'
    );
  });
}

export async function synthesizeSpeech(
  text: string,
  voiceId: string,
  modelId = 'eleven_multilingual_v2',
  signal?: AbortSignal
): Promise<Blob> {
  const apiKey = getApiKey();
  if (!apiKey) {
    throw new Error('ElevenLabs API key not configured');
  }

  const res = await fetch(
    `${API_BASE}/v1/text-to-speech/${voiceId}`,
    {
      method: 'POST',
      headers: {
        'xi-api-key': apiKey,
        'Content-Type': 'application/json',
        Accept: 'audio/mpeg',
      },
      body: JSON.stringify({
        text,
        model_id: modelId,
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.75,
        },
      }),
      signal,
    }
  );

  if (!res.ok) {
    throw new Error(`ElevenLabs TTS error: ${res.status}`);
  }

  return res.blob();
}
