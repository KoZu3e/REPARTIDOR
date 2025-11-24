import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDelivery } from "@/context/delivery";
import { Clock } from "lucide-react";
import Modal from "@/components/Modal";
import OrderHistory from "@/components/OrderHistory";

export default function Pedidos() {
  const { orders, acceptOrder, rejectOrder } = useDelivery();
  const navigate = useNavigate();
  const [incomingId, setIncomingId] = useState<string | null>(null);
  const [timer, setTimer] = useState(20);
  const [showToast, setShowToast] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  // Simulate a new incoming order once after mount
  useEffect(() => {
    const t = setTimeout(() => {
      setIncomingId("ORD-NEW");
    }, 1200);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!incomingId) return;
    setTimer(20);
    const i = setInterval(() => setTimer((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(i);
  }, [incomingId]);

  const augmentedOrders = useMemo(
    () =>
      incomingId
        ? [
            {
              id: incomingId,
              customer: "Cliente nuevo",
              address: "Calle Luna 789, Sur",
              distanceKm: 1.8,
              earnings: 3200,
              status: "pendiente" as const,
            },
            ...orders,
          ]
        : orders,
    [incomingId, orders],
  );

  const onAccept = (id: string) => {
    acceptOrder(id);
    setIncomingId(null);
    setShowToast(true);
    setTimeout(() => navigate("/mapa"), 1000);
  };

  const onReject = (id: string) => {
    rejectOrder(id);
    setIncomingId(null);
  };

  return (
    <div className="min-h-screen pb-24 max-w-md mx-auto px-4 pt-6">
      <div className="flex items-center justify-between mb-4 animate-fade-in">
        <h1 className="text-xl font-semibold">Pedidos Asignados</h1>
        <button
          onClick={() => setShowHistory(true)}
          className="h-10 px-4 rounded-full bg-primary text-primary-foreground text-sm font-medium shadow hover:shadow-md hover:opacity-95 active:scale-95 transition-all duration-150 flex items-center gap-2 btn-ripple"
        >
          <Clock className="w-4 h-4" />
          <span>Historial</span>
        </button>
      </div>
      <div className="space-y-3">
        {augmentedOrders.map((o, idx) => (
          <article
            key={o.id}
            className="rounded-2xl border bg-white p-4 shadow-sm card-animated hover:shadow-md active:scale-98 animate-scale-in"
            style={{ animationDelay: `${idx * 80}ms` }}
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="font-semibold">{o.customer}</h3>
                <p className="text-sm text-muted-foreground">{o.address}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">{o.distanceKm.toFixed(1)} km</p>
                <p className="font-semibold text-primary">${o.earnings.toLocaleString("es-CL")} CLP</p>
              </div>
            </div>
            <div className="mt-3 flex gap-2">
              <button
                onClick={() => onAccept(o.id)}
                className="flex-1 h-11 rounded-xl bg-primary text-primary-foreground font-medium shadow hover:shadow-md hover:opacity-95 active:scale-95 transition-all duration-150 btn-ripple"
              >
                Aceptar
              </button>
              <button
                onClick={() => onReject(o.id)}
                className="flex-1 h-11 rounded-xl bg-muted text-foreground font-medium hover:bg-gray-200 active:scale-95 transition-all duration-150 btn-ripple"
              >
                Rechazar
              </button>
            </div>
          </article>
        ))}
      </div>

      <Modal open={!!incomingId} onClose={() => setIncomingId(null)}>
        <div className="space-y-2">
          <h2 className="text-lg font-semibold">Nuevo pedido disponible</h2>
          <p className="text-sm text-muted-foreground">Tienes {timer}s para aceptar o rechazar.</p>
          <div className="mt-3 flex gap-2">
            <button
              onClick={() => onAccept(incomingId!)}
              className="flex-1 h-11 rounded-xl bg-primary text-primary-foreground font-medium shadow"
            >
              Aceptar
            </button>
            <button
              onClick={() => onReject(incomingId!)}
              className="flex-1 h-11 rounded-xl bg-muted text-foreground font-medium"
            >
              Rechazar
            </button>
          </div>
        </div>
      </Modal>

      {showToast && (
        <div className="fixed top-4 left-4 right-4 z-50 max-w-md mx-auto bg-primary text-primary-foreground px-4 py-3 rounded-xl shadow-lg animate-pulse">
          ✓ Pedido aceptado
        </div>
      )}

      <OrderHistory open={showHistory} onClose={() => setShowHistory(false)} />
    </div>
  );
}
