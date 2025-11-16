import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDelivery } from "@/context/delivery";
import Modal from "@/components/Modal";

export default function Pedidos() {
  const { orders, acceptOrder, rejectOrder } = useDelivery();
  const navigate = useNavigate();
  const [incomingId, setIncomingId] = useState<string | null>(null);
  const [timer, setTimer] = useState(20);
  const [showToast, setShowToast] = useState(false);

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
      <h1 className="text-xl font-semibold mb-4">Pedidos Asignados</h1>
      <div className="space-y-3">
        {augmentedOrders.map((o) => (
          <article key={o.id} className="rounded-2xl border bg-white p-4 shadow-sm">
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
                className="flex-1 h-11 rounded-xl bg-primary text-primary-foreground font-medium shadow hover:opacity-95 active:opacity-90"
              >
                Aceptar
              </button>
              <button
                onClick={() => onReject(o.id)}
                className="flex-1 h-11 rounded-xl bg-muted text-foreground font-medium hover:bg-gray-200 active:opacity-90"
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
    </div>
  );
}
