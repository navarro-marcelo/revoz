import { ActionButton } from './ActionButton';

interface ConfirmModalProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmModal({ message, onConfirm, onCancel }: ConfirmModalProps) {
  return (
    <div className="fixed inset-0 bg-overlay z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
        <p className="text-2xl font-bold text-center mb-8">{message}</p>
        <div className="flex gap-4">
          <ActionButton
            label="SIM"
            onClick={onConfirm}
            variant="speak"
            className="flex-1 min-h-[72px] text-2xl"
          />
          <ActionButton
            label="NAO"
            onClick={onCancel}
            variant="clear"
            className="flex-1 min-h-[72px] text-2xl"
          />
        </div>
      </div>
    </div>
  );
}
