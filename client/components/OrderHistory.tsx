import { useState } from "react";
import { X } from "lucide-react";
import { useDelivery } from "@/context/delivery";

type FilterType = "today" | "week" | "month";

export default function OrderHistory({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { orderHistory } = useDelivery();
  const [filter, setFilter] = useState<FilterType>("today");

  const getDateRangeText = (dateStr: string, filterType: FilterType): boolean => {
    const orderDate = new Date(dateStr);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const daysDiff = Math.floor((today.getTime() - orderDate.getTime()) / (1000 * 60 * 60 * 24));

    if (filterType === "today") {
      return daysDiff === 0;
    } else if (filterType === "week") {
      return daysDiff >= 0 && daysDiff < 7;
    } else if (filterType === "month") {
      return daysDiff >= 0 && daysDiff < 30;
    }
    return false;
  };

  const filteredOrders = orderHistory.filter((o) => o.date && getDateRangeText(o.date, filter));

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center md:justify-center bg-black/40">
      <div className="w-full md:max-w-md max-h-96 md:max-h-screen md:rounded-2xl bg-white overflow-hidden animate-slide-in-up md:animate-scale-in">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-100 p-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">Historial de Pedidos</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-all duration-150 active:scale-95"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        {/* Filters */}
        <div className="sticky top-16 bg-white border-b border-gray-100 p-4 flex gap-2">
          <button
            onClick={() => setFilter("today")}
            className={`flex-1 h-9 rounded-full text-sm font-medium transition-all duration-150 active:scale-95 ${
              filter === "today"
                ? "bg-primary text-primary-foreground shadow"
                : "bg-gray-100 text-foreground hover:bg-gray-200"
            }`}
          >
            Hoy
          </button>
          <button
            onClick={() => setFilter("week")}
            className={`flex-1 h-9 rounded-full text-sm font-medium transition-all duration-150 active:scale-95 ${
              filter === "week"
                ? "bg-primary text-primary-foreground shadow"
                : "bg-gray-100 text-foreground hover:bg-gray-200"
            }`}
          >
            Semana
          </button>
          <button
            onClick={() => setFilter("month")}
            className={`flex-1 h-9 rounded-full text-sm font-medium transition-all duration-150 active:scale-95 ${
              filter === "month"
                ? "bg-primary text-primary-foreground shadow"
                : "bg-gray-100 text-foreground hover:bg-gray-200"
            }`}
          >
            Mes
          </button>
        </div>

        {/* Orders List */}
        <div className="overflow-y-auto max-h-[calc(100vh-200px)] md:max-h-[calc(100vh-240px)]">
          {filteredOrders.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
              <p className="text-muted-foreground text-sm">No hay pedidos en este período</p>
            </div>
          ) : (
            <div className="space-y-3 p-4">
              {filteredOrders.map((order) => (
                <div
                  key={order.id}
                  className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm hover:shadow-md transition-all duration-150"
                >
                  {/* Header: Date and Amount */}
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="text-xs text-muted-foreground">{order.date}</p>
                      <p className="text-xs text-muted-foreground mt-1">{order.estimatedTime}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-primary">${order.earnings.toLocaleString("es-CL")} CLP</p>
                      <p className={`text-xs mt-1 ${order.finalStatus === "entregado" ? "text-green-600" : "text-red-600"}`}>
                        {order.finalStatus === "entregado" ? "Entregado" : "Cancelado"}
                      </p>
                    </div>
                  </div>

                  {/* Addresses */}
                  <div className="space-y-2 border-t border-gray-100 pt-3">
                    <div>
                      <p className="text-xs text-muted-foreground">Retiro</p>
                      <p className="text-sm text-foreground">{order.pickupAddress}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Entrega</p>
                      <p className="text-sm text-foreground">{order.deliveryAddress}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
