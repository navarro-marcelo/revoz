import { useState } from 'react';
import { phraseCategories } from '../data/phrases';
import { ActionButton } from './ActionButton';

interface QuickPhrasesProps {
  onSelectPhrase: (phrase: string) => void;
  onClose: () => void;
}

export function QuickPhrases({ onSelectPhrase, onClose }: QuickPhrasesProps) {
  const [activeCategory, setActiveCategory] = useState(phraseCategories[0].id);
  const category = phraseCategories.find((c) => c.id === activeCategory)!;

  return (
    <div className="fixed inset-0 bg-overlay z-40 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-[85%] h-[85%] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-gray-100 border-b">
          <h2 className="text-2xl font-bold">FRASES RAPIDAS</h2>
          <ActionButton
            label="FECHAR"
            icon="✕"
            onClick={onClose}
            variant="clear"
            className="min-h-[48px] px-4 text-lg"
          />
        </div>

        {/* Category tabs */}
        <div className="flex gap-2 p-2 bg-gray-50 border-b overflow-x-auto">
          {phraseCategories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              className={`
                flex items-center gap-2 px-4 py-3 rounded-lg font-bold text-lg
                min-w-fit whitespace-nowrap cursor-pointer
                transition-colors duration-150
                ${
                  activeCategory === cat.id
                    ? 'bg-phrase text-white'
                    : 'bg-white text-gray-700 border border-gray-300'
                }
              `}
            >
              <span className="text-2xl">{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Phrases grid */}
        <div className="flex-1 overflow-y-auto p-3">
          <div className="grid grid-cols-2 gap-3">
            {category.phrases.map((phrase) => (
              <ActionButton
                key={phrase}
                label={phrase}
                onClick={() => onSelectPhrase(phrase)}
                variant="phrase"
                className="min-h-[56px] text-lg px-4 text-left justify-start"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
