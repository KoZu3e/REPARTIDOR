import { ReactNode } from "react";

export default function Modal({ open, onClose, children }: { open: boolean; onClose?: () => void; children: ReactNode }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40">
      <div className="w-full sm:max-w-md sm:rounded-2xl sm:shadow-xl sm:mx-4 bg-white">
        <div className="p-4">{children}</div>
        <div className="p-3 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-muted text-foreground font-medium hover:bg-gray-200 active:opacity-90"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
