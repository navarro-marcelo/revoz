import { useRef, useCallback } from 'react';

interface ActionButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'key' | 'speak' | 'clear' | 'suggestion' | 'phrase' | 'delete-word' | 'default';
  icon?: string;
  disabled?: boolean;
  className?: string;
  keySound?: boolean;
}

const audioCtx = typeof AudioContext !== 'undefined' ? new AudioContext() : null;

function playBeep() {
  if (!audioCtx) return;
  if (audioCtx.state === 'suspended') audioCtx.resume();
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.frequency.value = 800;
  gain.gain.value = 0.1;
  osc.start();
  osc.stop(audioCtx.currentTime + 0.05);
}

const variantStyles: Record<string, string> = {
  key: 'bg-key-bg text-key-text border border-gray-300',
  speak: 'bg-speak text-white',
  clear: 'bg-clear text-white',
  suggestion: 'bg-suggestion text-white',
  phrase: 'bg-phrase text-white',
  'delete-word': 'bg-delete-word text-white',
  default: 'bg-gray-200 text-gray-800',
};

export function ActionButton({
  label,
  onClick,
  variant = 'default',
  icon,
  disabled = false,
  className = '',
  keySound = false,
}: ActionButtonProps) {
  const lastTapRef = useRef(0);

  const handleClick = useCallback(() => {
    const now = Date.now();
    if (now - lastTapRef.current < 300) return;
    lastTapRef.current = now;

    if (keySound) playBeep();
    onClick();
  }, [onClick, keySound]);

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled}
      className={`
        min-h-[48px] min-w-[48px] rounded-lg font-bold
        flex items-center justify-center gap-1
        active:scale-95 transition-transform duration-100
        select-none cursor-pointer
        disabled:opacity-40 disabled:cursor-not-allowed
        ${variantStyles[variant] || variantStyles.default}
        ${className}
      `}
    >
      {icon && <span className="text-xl">{icon}</span>}
      {label && <span>{label}</span>}
    </button>
  );
}
