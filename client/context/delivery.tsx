import { createContext, useContext, useMemo, useState, ReactNode } from "react";

export type DriverStatus = "Disponible" | "Ocupado" | "En entrega";

export interface Order {
  id: string;
  customer: string;
  address: string;
  distanceKm: number;
  earnings: number;
  status: "pendiente" | "aceptado" | "rechazado" | "completado";
  date?: string;
  pickupAddress?: string;
  deliveryAddress?: string;
  finalStatus?: "entregado" | "cancelado";
  estimatedTime?: string;
}

interface DeliveryState {
  driverName: string;
  status: DriverStatus;
  setStatus: (s: DriverStatus) => void;
  orders: Order[];
  acceptOrder: (id: string) => void;
  rejectOrder: (id: string) => void;
  completeOrder: (id: string) => void;
}

const DeliveryContext = createContext<DeliveryState | undefined>(undefined);

export function DeliveryProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<DriverStatus>("Disponible");
  const [orders, setOrders] = useState<Order[]>([
    {
      id: "ORD-1001",
      customer: "María Pérez",
      address: "Av. Reforma 123, Centro",
      distanceKm: 2.1,
      earnings: 6500,
      status: "pendiente",
    },
    {
      id: "ORD-1002",
      customer: "Juan López",
      address: "Calle Sol 456, Norte",
      distanceKm: 3.4,
      earnings: 5200,
      status: "pendiente",
    },
  ]);

  const acceptOrder = (id: string) => {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status: "aceptado" } : o)));
    setStatus("En entrega");
  };

  const rejectOrder = (id: string) => {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status: "rechazado" } : o)));
  };

  const completeOrder = (id: string) => {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status: "completado" } : o)));
    setStatus("Disponible");
  };

  const value: DeliveryState = useMemo(
    () => ({ driverName: "Josué", status, setStatus, orders, acceptOrder, rejectOrder, completeOrder }),
    [status, orders],
  );

  return <DeliveryContext.Provider value={value}>{children}</DeliveryContext.Provider>;
}

export function useDelivery() {
  const ctx = useContext(DeliveryContext);
  if (!ctx) throw new Error("useDelivery must be used within DeliveryProvider");
  return ctx;
}
