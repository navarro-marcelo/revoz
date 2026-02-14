# ElevenLabs TTS Integration Plan for REVOZ

## Context

REVOZ is an AAC (Augmentative and Alternative Communication) app that currently uses the browser's **Web Speech API** for text-to-speech. The voice selection is automatic and limited to whatever the OS/browser provides. The user wants to integrate **ElevenLabs** for higher-quality, customizable voices — including voice cloning — while keeping Web Speech as the default and guaranteed fallback.

**Critical constraint:** This is a communication tool for users with speech difficulties. Speech output must **never** break. If ElevenLabs fails (network, quota, error), the app must silently fall back to Web Speech with zero user intervention.

## Architecture: Strategy Pattern Inside useSpeech

The `useSpeech` hook keeps its **exact same return signature** `{ speak, stop, isSpeaking, voiceReady }`. Internally, it delegates to either a Web Speech engine or an ElevenLabs engine based on `settings.voiceProvider`. All consumers (`App.tsx`, `TextDisplay.tsx`, etc.) remain unchanged.

No new React Context or Provider is introduced — this matches the project's existing pattern of direct hook consumption.

---

## Phase 1: ElevenLabs Pre-Built Voices

### Step 1 — Extend types and settings
**File:** `src/utils/storageManager.ts`
- Added types: `VoiceProvider = 'browser' | 'elevenlabs'` and `ElevenLabsVoiceSource = 'prebuilt' | 'custom'`
- Extended `AppSettings` with ElevenLabs fields
- Extended `defaultSettings` accordingly

### Step 2 — Create ElevenLabs API client
**File:** `src/services/elevenLabsApi.ts`
- `isElevenLabsConfigured()` — checks if `VITE_ELEVENLABS_API_KEY` env var is set
- `fetchVoices()` — GET `/v1/voices`, filter for pt-BR / multilingual voices
- `synthesizeSpeech(text, voiceId, modelId?, signal?)` — POST `/v1/text-to-speech/{voiceId}`, return audio `Blob`

### Step 3 — Create voices listing hook
**File:** `src/hooks/useElevenLabsVoices.ts`
- Calls `fetchVoices()` on mount (only when API key is configured)
- Returns `{ voices, loading, error }`

### Step 4 — Refactor useSpeech with strategy + fallback
**File:** `src/hooks/useSpeech.ts`
- Web Speech extracted into `speakWebSpeech(text)` internal function
- ElevenLabs via `speakElevenLabs(text)` with `AbortController` support
- Unified `speak(text)` delegates to provider with silent fallback
- `stop()` cancels both engines
- Blob URL cleanup prevents memory leaks

### Step 5 — Update SettingsPanel UI
**File:** `src/components/SettingsPanel.tsx`
- Voice provider toggle: `NAVEGADOR` / `ELEVENLABS`
- ElevenLabs voice dropdown with loading/error states
- Voice speed and pitch sliders hidden when ElevenLabs is active

### Step 6 — Environment setup
**File:** `.env.example`

---

## Phase 2: Instant Voice Cloning

### Step 7 — Voice source toggle in SettingsPanel
- `PRE-DEFINIDA` / `VOZ PERSONALIZADA` toggle
- Custom voice ID text input
- Optional display name input

---

## Phase 3: Professional Voice Cloning

### Step 8 — Model selector in SettingsPanel
- `MULTILINGUAL V2` (highest quality) / `TURBO V2.5` (lower latency)

---

## Fallback Mechanism (3 Levels)

1. **Config fallback:** No API key -> provider toggle disabled -> Web Speech used
2. **API fallback:** Network/auth/quota error -> `speakElevenLabs` returns `false` -> `speakWebSpeech` called automatically
3. **Playback fallback:** Audio element error -> same fallback chain

In all cases: `console.warn` for debugging, no user-facing error. Speech always works.

## Files Summary

| File | Action |
|------|--------|
| `src/utils/storageManager.ts` | Modified — extended types + defaults |
| `src/services/elevenLabsApi.ts` | Created — API client |
| `src/hooks/useElevenLabsVoices.ts` | Created — voices hook |
| `src/hooks/useSpeech.ts` | Modified — strategy pattern + fallback |
| `src/components/SettingsPanel.tsx` | Modified — new UI sections |
| `.env.example` | Created — env var documentation |
