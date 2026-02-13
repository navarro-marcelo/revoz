import type { AppSettings } from '../utils/storageManager';
import { ActionButton } from './ActionButton';

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
          {/* Voice speed */}
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

          {/* Pitch */}
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
