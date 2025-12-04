import { useState, useEffect } from "react";
import { X, Phone } from "lucide-react";

export default function CallModal({
  open,
  onClose,
  customerName,
  customerPhone,
}: {
  open: boolean;
  onClose: () => void;
  customerName: string;
  customerPhone: string;
}) {
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (!open) return;
    const interval = setInterval(() => setDuration((d) => d + 1), 1000);
    return () => clearInterval(interval);
  }, [open]);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-sm mx-4 md:mx-0 rounded-2xl bg-white overflow-hidden animate-scale-in">
        <div className="p-8 flex flex-col items-center text-center">
          {/* Title */}
          <h2 className="text-xl font-semibold text-foreground mb-2">
            {customerName}
          </h2>
          <p className="text-sm text-muted-foreground mb-6">{customerPhone}</p>

          {/* Status */}
          <div className="mb-8">
            <p className="text-lg font-semibold text-primary mb-2">
              Llamando...
            </p>
            <p className="text-xs text-muted-foreground">(Simulado)</p>
          </div>

          {/* Duration */}
          <div className="bg-gray-50 rounded-2xl px-6 py-4 mb-8 w-full">
            <p className="text-3xl font-bold text-primary text-center font-mono">
              {formatDuration(duration)}
            </p>
          </div>

          {/* Animated pulse circle */}
          <div className="mb-8">
            <div className="relative w-20 h-20">
              <div
                className="absolute inset-0 rounded-full bg-primary/20 animate-pulse"
                style={{
                  animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
                }}
              />
              <div className="absolute inset-3 rounded-full bg-primary/40" />
              <div className="absolute inset-4 rounded-full bg-primary flex items-center justify-center">
                <Phone className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>

          {/* End Call Button */}
          <button
            onClick={onClose}
            className="w-full h-12 rounded-xl bg-red-500 text-white font-semibold shadow hover:shadow-md hover:opacity-95 active:scale-95 transition-all duration-150"
          >
            Finalizar llamada
          </button>
        </div>
      </div>
    </div>
  );
}
