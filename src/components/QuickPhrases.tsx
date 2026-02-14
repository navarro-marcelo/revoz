import { useState } from 'react';
import { phraseCategories } from '../data/phrases';
import { ActionButton } from './ActionButton';
import { loadSavedPhrases, deleteSavedPhrase } from '../utils/storageManager';

const SAVED_TAB_ID = '__saved__';

interface QuickPhrasesProps {
  onSelectPhrase: (phrase: string) => void;
  onClose: () => void;
}

export function QuickPhrases({ onSelectPhrase, onClose }: QuickPhrasesProps) {
  const [activeCategory, setActiveCategory] = useState(SAVED_TAB_ID);
  const [savedPhrases, setSavedPhrases] = useState(() => loadSavedPhrases());
  const category = phraseCategories.find((c) => c.id === activeCategory);

  const isSavedTab = activeCategory === SAVED_TAB_ID;

  function handleDeleteSaved(phrase: string) {
    deleteSavedPhrase(phrase);
    setSavedPhrases(loadSavedPhrases());
  }

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
          <button
            type="button"
            onClick={() => setActiveCategory(SAVED_TAB_ID)}
            className={`
              flex items-center gap-2 px-4 py-3 rounded-lg font-bold text-lg
              min-w-fit whitespace-nowrap cursor-pointer
              transition-colors duration-150
              ${
                isSavedTab
                  ? 'bg-save text-white'
                  : 'bg-white text-gray-700 border border-gray-300'
              }
            `}
          >
            <span className="text-2xl">⭐</span>
            <span>Minhas Frases</span>
          </button>
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
          {isSavedTab ? (
            savedPhrases.length === 0 ? (
              <div className="flex items-center justify-center h-full text-gray-400 text-xl text-center px-6">
                Nenhuma frase salva ainda. Digite uma frase, clique FALAR, e depois SALVAR.
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-3">
                {savedPhrases.map((phrase) => (
                  <div key={phrase} className="flex gap-2">
                    <ActionButton
                      label={phrase}
                      onClick={() => onSelectPhrase(phrase)}
                      variant="save"
                      className="min-h-[56px] text-lg px-4 text-left justify-start flex-1"
                    />
                    <button
                      type="button"
                      onClick={() => handleDeleteSaved(phrase)}
                      className="min-h-[48px] min-w-[48px] rounded-lg bg-red-100 text-red-600 font-bold text-xl flex items-center justify-center shrink-0 cursor-pointer active:scale-95 transition-transform duration-100"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )
          ) : (
            <div className="grid grid-cols-2 gap-3">
              {category!.phrases.map((phrase) => (
                <ActionButton
                  key={phrase}
                  label={phrase}
                  onClick={() => onSelectPhrase(phrase)}
                  variant="phrase"
                  className="min-h-[56px] text-lg px-4 text-left justify-start"
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
