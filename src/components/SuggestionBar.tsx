import { ActionButton } from './ActionButton';

interface SuggestionBarProps {
  suggestions: string[];
  onSelect: (word: string) => void;
}

export function SuggestionBar({ suggestions, onSelect }: SuggestionBarProps) {
  if (suggestions.length === 0) {
    return (
      <div className="flex items-center justify-center h-full px-4">
        <span className="text-gray-400 text-lg">
          Toque nas letras para ver sugestoes...
        </span>
      </div>
    );
  }

  return (
    <div className="flex gap-2 h-full items-center px-2">
      {suggestions.map((word) => (
        <ActionButton
          key={word}
          label={word}
          onClick={() => onSelect(word)}
          variant="suggestion"
          className="flex-1 text-xl min-h-[48px]"
        />
      ))}
    </div>
  );
}
