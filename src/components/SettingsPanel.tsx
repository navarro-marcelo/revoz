import type { AppSettings } from '../utils/storageManager';
import { ActionButton } from './ActionButton';
import { isElevenLabsConfigured } from '../services/elevenLabsApi';
import { useElevenLabsVoices } from '../hooks/useElevenLabsVoices';

interface SettingsPanelProps {
  settings: AppSettings;
  onUpdate: (partial: Partial<AppSettings>) => void;
  onReset: () => void;
  onTestVoice: () => void;
  onClose: () => void;
}

export function SettingsPanel({
  settings,
  onUpdate,
  onReset,
  onTestVoice,
  onClose,
}: SettingsPanelProps) {
  const apiConfigured = isElevenLabsConfigured();
  const { voices, loading, error } = useElevenLabsVoices();
  const isElevenLabs = settings.voiceProvider === 'elevenlabs';

  return (
    <div className="fixed inset-0 bg-overlay z-40 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-[70%] max-w-lg shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-gray-100 border-b">
          <h2 className="text-2xl font-bold">CONFIGURACOES</h2>
          <ActionButton
            label="FECHAR"
            icon="✕"
            onClick={onClose}
            variant="clear"
            className="min-h-[48px] px-4 text-lg"
          />
        </div>

        <div className="p-6 space-y-6 overflow-y-auto max-h-[70vh]">
          {/* Voice provider toggle */}
          <div>
            <label className="block text-xl font-bold mb-2">
              Motor de Voz
            </label>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => onUpdate({ voiceProvider: 'browser' })}
                className={`
                  flex-1 py-3 rounded-lg font-bold text-lg cursor-pointer
                  transition-colors duration-150
                  ${!isElevenLabs ? 'bg-suggestion text-white' : 'bg-gray-200 text-gray-700'}
                `}
              >
                NAVEGADOR
              </button>
              <button
                type="button"
                onClick={() => {
                  if (apiConfigured) onUpdate({ voiceProvider: 'elevenlabs' });
                }}
                disabled={!apiConfigured}
                className={`
                  flex-1 py-3 rounded-lg font-bold text-lg
                  transition-colors duration-150
                  ${!apiConfigured ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'cursor-pointer'}
                  ${isElevenLabs && apiConfigured ? 'bg-suggestion text-white' : ''}
                  ${!isElevenLabs && apiConfigured ? 'bg-gray-200 text-gray-700' : ''}
                `}
              >
                ELEVENLABS
              </button>
            </div>
            {!apiConfigured && (
              <p className="text-sm text-gray-400 mt-1">
                Chave da API nao configurada
              </p>
            )}
          </div>

          {/* ElevenLabs settings */}
          {isElevenLabs && apiConfigured && (
            <>
              {/* Voice source toggle */}
              <div>
                <label className="block text-xl font-bold mb-2">
                  Origem da Voz
                </label>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() =>
                      onUpdate({ elevenLabsVoiceSource: 'prebuilt' })
                    }
                    className={`
                      flex-1 py-3 rounded-lg font-bold text-lg cursor-pointer
                      transition-colors duration-150
                      ${settings.elevenLabsVoiceSource === 'prebuilt' ? 'bg-suggestion text-white' : 'bg-gray-200 text-gray-700'}
                    `}
                  >
                    PRE-DEFINIDA
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      onUpdate({ elevenLabsVoiceSource: 'custom' })
                    }
                    className={`
                      flex-1 py-3 rounded-lg font-bold text-lg cursor-pointer
                      transition-colors duration-150
                      ${settings.elevenLabsVoiceSource === 'custom' ? 'bg-suggestion text-white' : 'bg-gray-200 text-gray-700'}
                    `}
                  >
                    VOZ PERSONALIZADA
                  </button>
                </div>
              </div>

              {settings.elevenLabsVoiceSource === 'prebuilt' ? (
                /* Pre-built voice dropdown */
                <div>
                  <label className="block text-xl font-bold mb-2">
                    Voz ElevenLabs
                  </label>
                  {loading && (
                    <p className="text-gray-500">Carregando vozes...</p>
                  )}
                  {error && (
                    <p className="text-red-500 text-sm">Erro: {error}</p>
                  )}
                  {!loading && !error && (
                    <select
                      value={settings.elevenLabsVoiceId}
                      onChange={(e) => {
                        const selected = voices.find(
                          (v) => v.voice_id === e.target.value
                        );
                        onUpdate({
                          elevenLabsVoiceId: e.target.value,
                          elevenLabsVoiceName: selected?.name ?? '',
                        });
                      }}
                      className="w-full h-12 px-3 rounded-lg border-2 border-gray-300 text-lg bg-white cursor-pointer"
                    >
                      <option value="">Selecione uma voz</option>
                      {voices.map((v) => (
                        <option key={v.voice_id} value={v.voice_id}>
                          {v.name} ({v.category})
                        </option>
                      ))}
                    </select>
                  )}
                </div>
              ) : (
                /* Custom voice inputs */
                <div className="space-y-4">
                  <div>
                    <label className="block text-xl font-bold mb-2">
                      ID da Voz
                    </label>
                    <input
                      type="text"
                      value={settings.elevenLabsCustomVoiceId}
                      onChange={(e) =>
                        onUpdate({ elevenLabsCustomVoiceId: e.target.value })
                      }
                      placeholder="Cole o ID da voz do ElevenLabs"
                      className="w-full h-12 px-3 rounded-lg border-2 border-gray-300 text-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-lg font-bold mb-2">
                      Nome (opcional)
                    </label>
                    <input
                      type="text"
                      value={settings.elevenLabsCustomVoiceName}
                      onChange={(e) =>
                        onUpdate({ elevenLabsCustomVoiceName: e.target.value })
                      }
                      placeholder="Nome para identificar a voz"
                      className="w-full h-12 px-3 rounded-lg border-2 border-gray-300 text-lg"
                    />
                  </div>
                </div>
              )}

              {/* Model selector (for custom voices) */}
              {settings.elevenLabsVoiceSource === 'custom' && (
                <div>
                  <label className="block text-xl font-bold mb-2">Modelo</label>
                  <div className="flex gap-3">
                    {[
                      {
                        id: 'eleven_multilingual_v2',
                        label: 'MULTILINGUAL V2',
                        desc: 'Maior qualidade',
                      },
                      {
                        id: 'eleven_turbo_v2_5',
                        label: 'TURBO V2.5',
                        desc: 'Menor latencia',
                      },
                    ].map((model) => (
                      <button
                        key={model.id}
                        type="button"
                        onClick={() =>
                          onUpdate({ elevenLabsModelId: model.id })
                        }
                        className={`
                          flex-1 py-3 rounded-lg font-bold text-base cursor-pointer
                          transition-colors duration-150
                          ${settings.elevenLabsModelId === model.id ? 'bg-suggestion text-white' : 'bg-gray-200 text-gray-700'}
                        `}
                      >
                        <div>{model.label}</div>
                        <div className="text-xs font-normal mt-1 opacity-75">
                          {model.desc}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          {/* Voice speed - only for browser */}
          {!isElevenLabs && (
            <div>
              <label className="block text-xl font-bold mb-2">
                Velocidade da Voz: {settings.voiceSpeed.toFixed(2)}
              </label>
              <input
                type="range"
                min="0.5"
                max="1.5"
                step="0.05"
                value={settings.voiceSpeed}
                onChange={(e) =>
                  onUpdate({ voiceSpeed: parseFloat(e.target.value) })
                }
                className="w-full h-12 cursor-pointer accent-suggestion"
              />
              <div className="flex justify-between text-sm text-gray-500">
                <span>Devagar</span>
                <span>Rapido</span>
              </div>
            </div>
          )}

          {/* Pitch - only for browser */}
          {!isElevenLabs && (
            <div>
              <label className="block text-xl font-bold mb-2">
                Tom da Voz: {settings.pitch.toFixed(2)}
              </label>
              <input
                type="range"
                min="0.5"
                max="2.0"
                step="0.1"
                value={settings.pitch}
                onChange={(e) =>
                  onUpdate({ pitch: parseFloat(e.target.value) })
                }
                className="w-full h-12 cursor-pointer accent-suggestion"
              />
              <div className="flex justify-between text-sm text-gray-500">
                <span>Grave</span>
                <span>Agudo</span>
              </div>
            </div>
          )}

          {/* Font size */}
          <div>
            <label className="block text-xl font-bold mb-3">
              Tamanho da Fonte
            </label>
            <div className="flex gap-3">
              {[
                { value: 0, label: 'Normal' },
                { value: 1, label: 'Grande' },
                { value: 2, label: 'Muito Grande' },
              ].map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => onUpdate({ fontSize: opt.value })}
                  className={`
                    flex-1 py-3 rounded-lg font-bold text-lg cursor-pointer
                    transition-colors duration-150
                    ${
                      settings.fontSize === opt.value
                        ? 'bg-suggestion text-white'
                        : 'bg-gray-200 text-gray-700'
                    }
                  `}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Key sound */}
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold">Som ao Teclar</span>
            <button
              type="button"
              onClick={() => onUpdate({ keySound: !settings.keySound })}
              className={`
                px-6 py-3 rounded-lg font-bold text-lg cursor-pointer
                transition-colors duration-150
                ${
                  settings.keySound
                    ? 'bg-speak text-white'
                    : 'bg-gray-300 text-gray-600'
                }
              `}
            >
              {settings.keySound ? 'LIGADO' : 'DESLIGADO'}
            </button>
          </div>

          {/* Action buttons */}
          <div className="flex gap-3 pt-4 border-t">
            <ActionButton
              label="TESTAR VOZ"
              icon="🔊"
              onClick={onTestVoice}
              variant="speak"
              className="flex-1 min-h-[56px] text-lg"
            />
            <ActionButton
              label="RESTAURAR PADROES"
              icon="↻"
              onClick={onReset}
              variant="default"
              className="flex-1 min-h-[56px] text-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
