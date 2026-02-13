import { useReducer } from 'react';
import { TextDisplay } from './components/TextDisplay';
import { SuggestionBar } from './components/SuggestionBar';
import { AlphaKeyboard } from './components/AlphaKeyboard';
import { QuickPhrases } from './components/QuickPhrases';
import { SettingsPanel } from './components/SettingsPanel';
import { ConfirmModal } from './components/ConfirmModal';
import { useSpeech } from './hooks/useSpeech';
import { useAutocomplete } from './hooks/useAutocomplete';
import { useSettings } from './hooks/useSettings';
import { replacePartialWord, deleteLastWord, getCurrentPartialWord, normalize } from './utils/textProcessor';
import { saveRecentPhrase } from './utils/storageManager';

interface AppState {
  currentText: string;
  showQuickPhrases: boolean;
  showSettings: boolean;
  showClearConfirm: boolean;
}

type Action =
  | { type: 'APPEND_CHAR'; char: string }
  | { type: 'DELETE_CHAR' }
  | { type: 'DELETE_WORD' }
  | { type: 'CLEAR_TEXT' }
  | { type: 'ADD_SPACE' }
  | { type: 'SELECT_SUGGESTION'; word: string }
  | { type: 'SELECT_PHRASE'; phrase: string }
  | { type: 'TOGGLE_QUICK_PHRASES' }
  | { type: 'TOGGLE_SETTINGS' }
  | { type: 'TOGGLE_CLEAR_CONFIRM' };

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'APPEND_CHAR':
      return { ...state, currentText: state.currentText + action.char };
    case 'DELETE_CHAR':
      return { ...state, currentText: state.currentText.slice(0, -1) };
    case 'DELETE_WORD':
      return { ...state, currentText: deleteLastWord(state.currentText) };
    case 'CLEAR_TEXT':
      return { ...state, currentText: '', showClearConfirm: false };
    case 'ADD_SPACE':
      return {
        ...state,
        currentText: state.currentText.endsWith(' ')
          ? state.currentText
          : state.currentText + ' ',
      };
    case 'SELECT_SUGGESTION':
      return {
        ...state,
        currentText: replacePartialWord(state.currentText, action.word),
      };
    case 'SELECT_PHRASE':
      return {
        ...state,
        currentText: action.phrase,
        showQuickPhrases: false,
      };
    case 'TOGGLE_QUICK_PHRASES':
      return { ...state, showQuickPhrases: !state.showQuickPhrases };
    case 'TOGGLE_SETTINGS':
      return { ...state, showSettings: !state.showSettings };
    case 'TOGGLE_CLEAR_CONFIRM':
      return { ...state, showClearConfirm: !state.showClearConfirm };
    default:
      return state;
  }
}

const initialState: AppState = {
  currentText: '',
  showQuickPhrases: false,
  showSettings: false,
  showClearConfirm: false,
};

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { settings, updateSettings, resetSettings } = useSettings();
  const { speak, stop, isSpeaking } = useSpeech(settings);
  const { suggestions, learnWord } = useAutocomplete(state.currentText);

  function learnCurrentWords(text: string) {
    const words = text.trim().split(/\s+/).filter(Boolean);
    for (const w of words) {
      learnWord(normalize(w));
    }
  }

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Zone 1: Text Display (20%) */}
      <div className="h-[20%] min-h-0">
        <TextDisplay
          text={state.currentText}
          fontSize={settings.fontSize}
          isSpeaking={isSpeaking}
          onSpeak={() => {
            learnCurrentWords(state.currentText);
            speak(state.currentText);
          }}
          onStop={stop}
          onDeleteWord={() => dispatch({ type: 'DELETE_WORD' })}
          onClear={() => dispatch({ type: 'TOGGLE_CLEAR_CONFIRM' })}
          onOpenPhrases={() => dispatch({ type: 'TOGGLE_QUICK_PHRASES' })}
          onOpenSettings={() => dispatch({ type: 'TOGGLE_SETTINGS' })}
        />
      </div>

      {/* Zone 2: Suggestion Bar (15%) */}
      <div className="h-[15%] min-h-0 border-y border-gray-200">
        <SuggestionBar
          suggestions={suggestions}
          onSelect={(word) =>
            dispatch({ type: 'SELECT_SUGGESTION', word })
          }
        />
      </div>

      {/* Zone 3: Keyboard (65%) */}
      <div className="h-[65%] min-h-0">
        <AlphaKeyboard
          onChar={(char) => dispatch({ type: 'APPEND_CHAR', char })}
          onSpace={() => {
            const partial = getCurrentPartialWord(state.currentText);
            if (partial) learnWord(normalize(partial));
            dispatch({ type: 'ADD_SPACE' });
          }}
          onDelete={() => dispatch({ type: 'DELETE_CHAR' })}
          keySound={settings.keySound}
        />
      </div>

      {/* Modals */}
      {state.showQuickPhrases && (
        <QuickPhrases
          onSelectPhrase={(phrase) => {
            dispatch({ type: 'SELECT_PHRASE', phrase });
            saveRecentPhrase(phrase);
            speak(phrase);
          }}
          onClose={() => dispatch({ type: 'TOGGLE_QUICK_PHRASES' })}
        />
      )}

      {state.showSettings && (
        <SettingsPanel
          settings={settings}
          onUpdate={updateSettings}
          onReset={resetSettings}
          onTestVoice={() => speak('Ola, eu sou a voz do REVOZ.')}
          onClose={() => dispatch({ type: 'TOGGLE_SETTINGS' })}
        />
      )}

      {state.showClearConfirm && (
        <ConfirmModal
          message="Tem certeza que deseja limpar todo o texto?"
          onConfirm={() => dispatch({ type: 'CLEAR_TEXT' })}
          onCancel={() => dispatch({ type: 'TOGGLE_CLEAR_CONFIRM' })}
        />
      )}
    </div>
  );
}
