import { useState, useEffect } from "react";
import { useDelivery } from "@/context/delivery";
import { MessageCircle, Phone, MapPin } from "lucide-react";
import ChatModal from "@/components/ChatModal";
import CallModal from "@/components/CallModal";

export default function Mapa() {
  const { acceptOrder, getActiveOrder } = useDelivery();
  const [timer, setTimer] = useState(28);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [showCall, setShowCall] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const activeOrder = getActiveOrder();

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((t) => (t > 0 ? t - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (toastMessage) {
      const timeout = setTimeout(() => setToastMessage(null), 3000);
      return () => clearTimeout(timeout);
    }
  }, [toastMessage]);

  const handleChatClick = () => {
    if (!activeOrder) {
      setToastMessage("No hay un pedido activo para chatear.");
      return;
    }
    setShowChat(true);
  };

  const handleCallClick = () => {
    if (!activeOrder) {
      setToastMessage("No hay un pedido activo para llamar.");
      return;
    }
    if (!activeOrder.phone) {
      setToastMessage("El cliente no tiene un número disponible.");
      return;
    }
    setShowCall(true);
  };

  const handleTakePedido = () => {
    acceptOrder("ORD-1001");
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (timer / 60) * circumference;

  return (
    <div className="min-h-screen pb-20 bg-white animate-fade-in">
      {/* Realistic Map Simulation */}
      <div
        className="relative h-96 bg-white overflow-hidden animate-fade-in"
        style={{ animationDelay: "50ms" }}
      >
        {/* Map background - off-white color for streets */}
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 400 400"
          preserveAspectRatio="xMidYMid slice"
        >
          {/* Background */}
          <rect width="400" height="400" fill="#F5F5F5" />

          {/* Parks/Green areas */}
          <rect
            x="20"
            y="30"
            width="60"
            height="70"
            fill="#D4EAD4"
            rx="8"
            opacity="0.8"
          />
          <circle cx="330" cy="80" r="45" fill="#D4EAD4" opacity="0.8" />
          <rect
            x="80"
            y="280"
            width="80"
            height="90"
            fill="#D4EAD4"
            rx="8"
            opacity="0.8"
          />
          <circle cx="280" cy="340" r="40" fill="#D4EAD4" opacity="0.8" />

          {/* Vertical Streets (light gray) */}
          <line
            x1="40"
            y1="0"
            x2="40"
            y2="400"
            stroke="#E0E0E0"
            strokeWidth="8"
          />
          <line
            x1="100"
            y1="0"
            x2="100"
            y2="400"
            stroke="#E0E0E0"
            strokeWidth="8"
          />
          <line
            x1="160"
            y1="0"
            x2="160"
            y2="400"
            stroke="#E0E0E0"
            strokeWidth="8"
          />
          <line
            x1="220"
            y1="0"
            x2="220"
            y2="400"
            stroke="#E0E0E0"
            strokeWidth="8"
          />
          <line
            x1="280"
            y1="0"
            x2="280"
            y2="400"
            stroke="#E0E0E0"
            strokeWidth="8"
          />
          <line
            x1="340"
            y1="0"
            x2="340"
            y2="400"
            stroke="#E0E0E0"
            strokeWidth="8"
          />

          {/* Horizontal Streets (light gray) */}
          <line
            x1="0"
            y1="40"
            x2="400"
            y2="40"
            stroke="#E0E0E0"
            strokeWidth="8"
          />
          <line
            x1="0"
            y1="100"
            x2="400"
            y2="100"
            stroke="#E0E0E0"
            strokeWidth="8"
          />
          <line
            x1="0"
            y1="160"
            x2="400"
            y2="160"
            stroke="#E0E0E0"
            strokeWidth="8"
          />
          <line
            x1="0"
            y1="220"
            x2="400"
            y2="220"
            stroke="#E0E0E0"
            strokeWidth="8"
          />
          <line
            x1="0"
            y1="280"
            x2="400"
            y2="280"
            stroke="#E0E0E0"
            strokeWidth="8"
          />
          <line
            x1="0"
            y1="340"
            x2="400"
            y2="340"
            stroke="#E0E0E0"
            strokeWidth="8"
          />

          {/* Lane markings (white dashed lines) on major streets */}
          <line
            x1="40"
            y1="70"
            x2="40"
            y2="90"
            stroke="white"
            strokeWidth="1.5"
            strokeDasharray="3,2"
            opacity="0.6"
          />
          <line
            x1="40"
            y1="110"
            x2="40"
            y2="150"
            stroke="white"
            strokeWidth="1.5"
            strokeDasharray="3,2"
            opacity="0.6"
          />
          <line
            x1="40"
            y1="170"
            x2="40"
            y2="210"
            stroke="white"
            strokeWidth="1.5"
            strokeDasharray="3,2"
            opacity="0.6"
          />
          <line
            x1="40"
            y1="230"
            x2="40"
            y2="270"
            stroke="white"
            strokeWidth="1.5"
            strokeDasharray="3,2"
            opacity="0.6"
          />
          <line
            x1="40"
            y1="290"
            x2="40"
            y2="330"
            stroke="white"
            strokeWidth="1.5"
            strokeDasharray="3,2"
            opacity="0.6"
          />

          <line
            x1="100"
            y1="40"
            x2="140"
            y2="40"
            stroke="white"
            strokeWidth="1.5"
            strokeDasharray="3,2"
            opacity="0.6"
          />
          <line
            x1="160"
            y1="40"
            x2="200"
            y2="40"
            stroke="white"
            strokeWidth="1.5"
            strokeDasharray="3,2"
            opacity="0.6"
          />
          <line
            x1="220"
            y1="40"
            x2="260"
            y2="40"
            stroke="white"
            strokeWidth="1.5"
            strokeDasharray="3,2"
            opacity="0.6"
          />
          <line
            x1="280"
            y1="40"
            x2="320"
            y2="40"
            stroke="white"
            strokeWidth="1.5"
            strokeDasharray="3,2"
            opacity="0.6"
          />

          {/* Route line - red thin line from start to destination */}
          <path
            d="M 70 120 Q 150 140, 200 200 T 320 300"
            stroke="#E53935"
            strokeWidth="2.5"
            fill="none"
            opacity="0.85"
          />

          {/* Delivery person marker - red circle with rider emoji */}
          <g>
            <circle cx="70" cy="120" r="16" fill="#E53935" />
            <circle cx="70" cy="120" r="12" fill="white" opacity="0.2" />
            <text
              x="70"
              y="128"
              textAnchor="middle"
              fill="white"
              fontSize="16"
              fontWeight="bold"
            >
              🏍️
            </text>
          </g>

          {/* Destination marker - gray circle with location pin */}
          <g>
            <circle cx="320" cy="300" r="14" fill="#757575" opacity="0.7" />
            <text
              x="320"
              y="307"
              textAnchor="middle"
              fill="white"
              fontSize="14"
            >
              📍
            </text>
          </g>

          {/* Distance label */}
          <g>
            <rect
              x="155"
              y="235"
              width="90"
              height="30"
              fill="white"
              opacity="0.9"
              rx="6"
            />
            <text
              x="200"
              y="258"
              textAnchor="middle"
              fill="#757575"
              fontSize="12"
              fontWeight="bold"
            >
              2.4 km
            </text>
          </g>
        </svg>

        {/* Top Info */}
        <div className="absolute top-4 left-4 right-4 max-w-xs">
          <div className="bg-white/95 backdrop-blur rounded-xl p-3 shadow-sm">
            <p className="text-xs text-muted-foreground">Ruta óptima</p>
            <p className="font-semibold text-foreground">
              Av. Reforma 123, Centro
            </p>
          </div>
        </div>
      </div>

      {/* Floating Card (Bottom) */}
      <div className="fixed bottom-24 left-4 right-4 max-w-md mx-auto z-40 animate-slide-in-up">
        <div className="bg-white rounded-2xl shadow-lg border p-4 card-animated">
          <div className="flex items-start justify-between mb-3">
            <div>
              <p className="text-sm text-muted-foreground">Ganancia total</p>
              <h2 className="text-2xl font-bold text-foreground">$3.200 CLP</h2>
              <p className="text-xs text-muted-foreground mt-1">
                Distancia: 2.4 km
              </p>
              <div className="mt-2 space-y-1 text-xs text-muted-foreground">
                <p>Base: $1.500 CLP</p>
                <p>Propina: $800 CLP</p>
                <p>Distancia: $900 CLP</p>
              </div>
            </div>

            {/* Timer Circle */}
            <div className="flex flex-col items-center animate-bounce-subtle">
              <svg
                width="100"
                height="100"
                viewBox="0 0 100 100"
                className="transform -rotate-90"
              >
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
              <span className="text-sm font-bold text-primary absolute mt-2">
                {timer}s
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-4 space-y-2">
            <button
              onClick={handleTakePedido}
              className="w-full h-12 rounded-xl bg-primary text-primary-foreground font-semibold shadow hover:shadow-md hover:opacity-95 active:scale-95 transition-all duration-150 btn-ripple"
            >
              Tomar Pedido
            </button>
            <div className="flex gap-2">
              <button
                onClick={handleChatClick}
                className="flex-1 h-10 rounded-lg border border-border hover:bg-secondary active:scale-95 transition-all duration-150 flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-primary" />
                <span className="text-xs font-medium text-foreground">
                  Chat
                </span>
              </button>
              <button
                onClick={handleCallClick}
                className="flex-1 h-10 rounded-lg border border-border hover:bg-secondary active:scale-95 transition-all duration-150 flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-primary" />
                <span className="text-xs font-medium text-foreground">
                  Llamar
                </span>
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

      {/* Toast Notifications */}
      {toastMessage && (
        <div className="fixed top-4 left-4 right-4 z-50 max-w-md mx-auto bg-yellow-100 text-yellow-800 px-4 py-3 rounded-xl shadow-lg animate-pulse">
          {toastMessage}
        </div>
      )}

      {/* Modals */}
      {activeOrder && (
        <>
          <ChatModal
            open={showChat}
            onClose={() => setShowChat(false)}
            customerName={activeOrder.customer}
            orderId={activeOrder.id}
          />
          <CallModal
            open={showCall}
            onClose={() => setShowCall(false)}
            customerName={activeOrder.customer}
            customerPhone={activeOrder.phone || ""}
          />
        </>
      )}
    </div>
  );
}
