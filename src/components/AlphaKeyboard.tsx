import { useState } from 'react';
import { ActionButton } from './ActionButton';

interface AlphaKeyboardProps {
  onChar: (char: string) => void;
  onSpace: () => void;
  onDelete: () => void;
  keySound: boolean;
}

const ALPHA_ROW1 = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
const ALPHA_ROW2 = ['J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R'];
const ALPHA_ROW3 = ['S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'Ç'];

const NUM_ROW1 = ['1', '2', '3'];
const NUM_ROW2 = ['4', '5', '6'];
const NUM_ROW3 = ['7', '8', '9'];

export function AlphaKeyboard({ onChar, onSpace, onDelete, keySound }: AlphaKeyboardProps) {
  const [showNumbers, setShowNumbers] = useState(false);

  if (showNumbers) {
    return (
      <div className="flex flex-col gap-2 h-full p-2">
        {[NUM_ROW1, NUM_ROW2, NUM_ROW3].map((row, i) => (
          <div key={i} className="flex gap-2 flex-1">
            {row.map((num) => (
              <ActionButton
                key={num}
                label={num}
                onClick={() => onChar(num)}
                variant="key"
                keySound={keySound}
                className="flex-1 text-5xl"
              />
            ))}
          </div>
        ))}
        <div className="flex gap-2 flex-1">
          <ActionButton
            label="0"
            onClick={() => onChar('0')}
            variant="key"
            keySound={keySound}
            className="flex-1 text-5xl"
          />
          <ActionButton
            label="ABC"
            onClick={() => setShowNumbers(false)}
            variant="default"
            keySound={keySound}
            className="flex-1 text-2xl bg-blue-100 text-blue-700 font-bold"
          />
          <ActionButton
            label="APAGAR"
            icon="⌫"
            onClick={onDelete}
            variant="default"
            keySound={keySound}
            className="flex-1 text-2xl bg-gray-300"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2 h-full p-2">
      {[ALPHA_ROW1, ALPHA_ROW2, ALPHA_ROW3].map((row, i) => (
        <div key={i} className="flex gap-2 flex-1">
          {row.map((letter) => (
            <ActionButton
              key={letter}
              label={letter}
              onClick={() => onChar(letter.toLowerCase())}
              variant="key"
              keySound={keySound}
              className="flex-1 text-4xl"
            />
          ))}
        </div>
      ))}
      <div className="flex gap-2 flex-1">
        <ActionButton
          label="123"
          onClick={() => setShowNumbers(true)}
          variant="default"
          keySound={keySound}
          className="flex-[1] text-2xl bg-blue-100 text-blue-700 font-bold"
        />
        <ActionButton
          label="ESPACO"
          icon="⎵"
          onClick={onSpace}
          variant="key"
          keySound={keySound}
          className="flex-[2.5] text-2xl"
        />
        <ActionButton
          label="APAGAR"
          icon="⌫"
          onClick={onDelete}
          variant="default"
          keySound={keySound}
          className="flex-[1] text-2xl bg-gray-300"
        />
      </div>
    </div>
  );
}
