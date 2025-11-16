import { useState, useEffect } from "react";
import { useDelivery } from "@/context/delivery";
import { MessageCircle, Phone, MapPin } from "lucide-react";

export default function Mapa() {
  const { acceptOrder } = useDelivery();
  const [timer, setTimer] = useState(28);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((t) => (t > 0 ? t - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleTakePedido = () => {
    acceptOrder("ORD-1001");
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (timer / 60) * circumference;

  return (
    <div className="min-h-screen pb-20 bg-white">
      {/* Simplified Map */}
      <div className="relative h-96 bg-gradient-to-br from-blue-50 to-blue-100 overflow-hidden">
        {/* Route visualization */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400">
          {/* Dashed route line */}
          <line
            x1="50"
            y1="100"
            x2="350"
            y2="300"
            stroke="#E53935"
            strokeWidth="3"
            strokeDasharray="10,5"
            opacity="0.7"
          />
          {/* Delivery point marker */}
          <circle cx="50" cy="100" r="20" fill="#E53935" />
          <text x="50" y="110" textAnchor="middle" fill="white" fontSize="20">
            🏍️
          </text>

          {/* Destination marker */}
          <circle cx="350" cy="300" r="20" fill="#757575" opacity="0.6" />
          <text x="350" y="310" textAnchor="middle" fill="white" fontSize="20">
            📍
          </text>

          {/* Distance label */}
          <text
            x="200"
            y="210"
            textAnchor="middle"
            fill="#757575"
            fontSize="14"
            fontWeight="bold"
          >
            2.4 km
          </text>
        </svg>

        {/* Top Info */}
        <div className="absolute top-4 left-4 right-4 max-w-xs">
          <div className="bg-white/95 backdrop-blur rounded-xl p-3 shadow-sm">
            <p className="text-xs text-muted-foreground">Ruta óptima</p>
            <p className="font-semibold text-foreground">Av. Reforma 123, Centro</p>
          </div>
        </div>
      </div>

      {/* Floating Card (Bottom) */}
      <div className="fixed bottom-24 left-4 right-4 max-w-md mx-auto z-40">
        <div className="bg-white rounded-2xl shadow-lg border p-4">
          <div className="flex items-start justify-between mb-3">
            <div>
              <p className="text-sm text-muted-foreground">Ganancia total</p>
              <h2 className="text-2xl font-bold text-foreground">$3.200 CLP</h2>
              <p className="text-xs text-muted-foreground mt-1">Distancia: 2.4 km</p>
              <div className="mt-2 space-y-1 text-xs text-muted-foreground">
                <p>Base: $1.500 CLP</p>
                <p>Propina: $500 CLP</p>
                <p>Distancia: $200 CLP</p>
              </div>
            </div>

            {/* Timer Circle */}
            <div className="flex flex-col items-center">
              <svg width="100" height="100" viewBox="0 0 100 100" className="transform -rotate-90">
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="#E5E5E5"
                  strokeWidth="6"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="#E53935"
                  strokeWidth="6"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  style={{ transition: "stroke-dashoffset 0.5s linear" }}
                />
              </svg>
              <span className="text-sm font-bold text-primary absolute mt-2">{timer}s</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-4 space-y-2">
            <button
              onClick={handleTakePedido}
              className="w-full h-12 rounded-xl bg-primary text-primary-foreground font-semibold shadow hover:opacity-95 active:opacity-90"
            >
              Tomar Pedido
            </button>
            <div className="flex gap-2">
              <button className="flex-1 h-10 rounded-lg border border-border hover:bg-secondary flex items-center justify-center gap-2">
                <MessageCircle className="w-4 h-4 text-primary" />
                <span className="text-xs font-medium text-foreground">Chat</span>
              </button>
              <button className="flex-1 h-10 rounded-lg border border-border hover:bg-secondary flex items-center justify-center gap-2">
                <Phone className="w-4 h-4 text-primary" />
                <span className="text-xs font-medium text-foreground">Llamar</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Success Notification */}
      {showSuccess && (
        <div className="fixed top-4 left-4 right-4 z-50 max-w-md mx-auto bg-green-100 text-green-700 px-4 py-3 rounded-xl shadow-lg animate-pulse">
          ✓ Pedido aceptado - En proceso de entrega
        </div>
      )}
    </div>
  );
}
