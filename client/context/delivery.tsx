import { createContext, useContext, useMemo, useState, ReactNode } from "react";

export type DriverStatus = "Disponible" | "Ocupado" | "En entrega";

export interface Order {
  id: string;
  customer: string;
  address: string;
  distanceKm: number;
  earnings: number;
  status: "pendiente" | "aceptado" | "rechazado" | "completado";
  phone?: string;
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
  orderHistory: Order[];
  activeOrderId: string | null;
  setActiveOrderId: (id: string | null) => void;
  getActiveOrder: () => Order | undefined;
}

const DeliveryContext = createContext<DeliveryState | undefined>(undefined);

export function DeliveryProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<DriverStatus>("Disponible");
  const [activeOrderId, setActiveOrderId] = useState<string | null>(null);
  const [orders, setOrders] = useState<Order[]>([
    {
      id: "ORD-1001",
      customer: "María Pérez",
      address: "Av. Reforma 123, Centro",
      distanceKm: 2.1,
      earnings: 6500,
      status: "pendiente",
      phone: "+56987654321",
    },
    {
      id: "ORD-1002",
      customer: "Juan López",
      address: "Calle Sol 456, Norte",
      distanceKm: 3.4,
      earnings: 5200,
      status: "pendiente",
      phone: "+56912345678",
    },
  ]);

  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const threeDaysAgo = new Date(today);
  threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
  const weekAgo = new Date(today);
  weekAgo.setDate(weekAgo.getDate() - 7);
  const twoWeeksAgo = new Date(today);
  twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);

  const [orderHistory] = useState<Order[]>([
    {
      id: "ORD-9001",
      customer: "Carlos Rodríguez",
      address: "Paseo Ahumada 567",
      distanceKm: 1.5,
      earnings: 4200,
      status: "completado",
      date: today.toLocaleDateString("es-CL"),
      pickupAddress: "Restaurante Central, Av. O'Higgins 1200",
      deliveryAddress: "Paseo Ahumada 567, Centro",
      finalStatus: "entregado",
      estimatedTime: "15 min",
    },
    {
      id: "ORD-9002",
      customer: "Ana García",
      address: "Merced 890, Santiago",
      distanceKm: 2.3,
      earnings: 5500,
      status: "completado",
      date: today.toLocaleDateString("es-CL"),
      pickupAddress: "Café Costa, Moneda 456",
      deliveryAddress: "Merced 890, Santiago",
      finalStatus: "entregado",
      estimatedTime: "22 min",
    },
    {
      id: "ORD-9003",
      customer: "Roberto Martínez",
      address: "Teatinos 234",
      distanceKm: 1.2,
      earnings: 3800,
      status: "completado",
      date: yesterday.toLocaleDateString("es-CL"),
      pickupAddress: "Pizza Roma, Teatinos 100",
      deliveryAddress: "Teatinos 234, Centro",
      finalStatus: "entregado",
      estimatedTime: "12 min",
    },
    {
      id: "ORD-9004",
      customer: "Sofía Torres",
      address: "Lastarria 567",
      distanceKm: 2.8,
      earnings: 6200,
      status: "completado",
      date: yesterday.toLocaleDateString("es-CL"),
      pickupAddress: "Sushi Master, Av. Apoquindo 3000",
      deliveryAddress: "Lastarria 567, Ñuñoa",
      finalStatus: "entregado",
      estimatedTime: "28 min",
    },
    {
      id: "ORD-9005",
      customer: "Pedro López",
      address: "Av. Santa María 678",
      distanceKm: 1.9,
      earnings: 4500,
      status: "completado",
      date: threeDaysAgo.toLocaleDateString("es-CL"),
      pickupAddress: "Pollo Campero, Av. Italia 2200",
      deliveryAddress: "Av. Santa María 678",
      finalStatus: "entregado",
      estimatedTime: "18 min",
    },
    {
      id: "ORD-9006",
      customer: "Daniela Vásquez",
      address: "Calle Brasil 345",
      distanceKm: 0.8,
      earnings: 2900,
      status: "completado",
      date: threeDaysAgo.toLocaleDateString("es-CL"),
      pickupAddress: "Empanadas Caseras, Calle Brasil 100",
      deliveryAddress: "Calle Brasil 345",
      finalStatus: "cancelado",
      estimatedTime: "8 min",
    },
    {
      id: "ORD-9007",
      customer: "Martín Sánchez",
      address: "Puente 789",
      distanceKm: 3.1,
      earnings: 7100,
      status: "completado",
      date: weekAgo.toLocaleDateString("es-CL"),
      pickupAddress: "Burguer King, Providencia 1500",
      deliveryAddress: "Puente 789, Recoleta",
      finalStatus: "entregado",
      estimatedTime: "32 min",
    },
    {
      id: "ORD-9008",
      customer: "Elena Flores",
      address: "Andes 456",
      distanceKm: 2.5,
      earnings: 5800,
      status: "completado",
      date: twoWeeksAgo.toLocaleDateString("es-CL"),
      pickupAddress: "La Palta, Bellavista 800",
      deliveryAddress: "Andes 456, Ñuñoa",
      finalStatus: "entregado",
      estimatedTime: "24 min",
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

  const getActiveOrder = () => orders.find((o) => o.id === activeOrderId);

  const value: DeliveryState = useMemo(
    () => ({
      driverName: "Josué",
      status,
      setStatus,
      orders,
      acceptOrder,
      rejectOrder,
      completeOrder,
      orderHistory,
      activeOrderId,
      setActiveOrderId,
      getActiveOrder,
    }),
    [status, orders, orderHistory, activeOrderId],
  );

  return <DeliveryContext.Provider value={value}>{children}</DeliveryContext.Provider>;
}

export function useDelivery() {
  const ctx = useContext(DeliveryContext);
  if (!ctx) throw new Error("useDelivery must be used within DeliveryProvider");
  return ctx;
}
