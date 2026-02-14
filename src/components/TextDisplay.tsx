import { ActionButton } from './ActionButton';
import { getCurrentPartialWord } from '../utils/textProcessor';

interface TextDisplayProps {
  text: string;
  fontSize: number;
  isSpeaking: boolean;
  showSavePrompt: boolean;
  onSpeak: () => void;
  onStop: () => void;
  onSavePhrase: () => void;
  onDeleteWord: () => void;
  onClear: () => void;
  onOpenPhrases: () => void;
  onOpenSettings: () => void;
}

const fontSizeMap: Record<number, string> = {
  0: 'text-2xl',
  1: 'text-3xl',
  2: 'text-4xl',
};

export function TextDisplay({
  text,
  fontSize,
  isSpeaking,
  showSavePrompt,
  onSpeak,
  onStop,
  onSavePhrase,
  onDeleteWord,
  onClear,
  onOpenPhrases,
  onOpenSettings,
}: TextDisplayProps) {
  const partial = getCurrentPartialWord(text);
  const completed = partial
    ? text.slice(0, text.length - partial.length)
    : text;

  return (
    <div className="flex h-full gap-1.5 p-2 items-center">
      {/* Text area */}
      <div className="flex-1 bg-display-bg rounded-xl px-4 py-2 flex items-center overflow-hidden min-w-0 self-stretch">
        <div className={`${fontSizeMap[fontSize] || 'text-3xl'} leading-snug truncate`}>
          <span className="text-gray-800">{completed}</span>
          {partial && (
            <span className="text-suggestion underline decoration-2">{partial}</span>
          )}
          <span className="animate-pulse text-suggestion">|</span>
        </div>
      </div>

      {/* Action buttons in a row */}
      {isSpeaking ? (
        <ActionButton
          label="PARAR"
          icon="⏹"
          onClick={onStop}
          variant="clear"
          className="px-5 text-lg shrink-0"
        />
      ) : showSavePrompt ? (
        <ActionButton
          label="SALVAR"
          icon="⭐"
          onClick={onSavePhrase}
          variant="save"
          className="px-5 text-lg shrink-0"
        />
      ) : (
        <ActionButton
          label="FALAR"
          icon="🔊"
          onClick={onSpeak}
          variant="speak"
          className="px-5 text-lg shrink-0"
        />
      )}
      <ActionButton
        label=""
        icon="↩"
        onClick={onDeleteWord}
        variant="delete-word"
        className="px-4 text-lg shrink-0"
      />
      <ActionButton
        label=""
        icon="🗑"
        onClick={onClear}
        variant="clear"
        className="px-4 text-lg shrink-0"
      />
      <ActionButton
        label="FRASES"
        icon="💬"
        onClick={onOpenPhrases}
        variant="phrase"
        className="px-3 text-base shrink-0"
      />
      <ActionButton
        label=""
        icon="⚙"
        onClick={onOpenSettings}
        variant="default"
        className="px-3 text-xl shrink-0"
      />
    </div>
  );
}
