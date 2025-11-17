import { useState } from "react";
import { ArrowLeft, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

type FilterType = "day" | "week" | "month";

interface EarningsEntry {
  id: string;
  date: string;
  time: string;
  address: string;
  amount: number;
}

export default function Ganancias() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<FilterType>("day");

  // Mock data for different periods
  const earningsData = {
    day: {
      total: 45600,
      orders: 8,
      average: 5700,
      entries: [
        { id: "ORD-1", date: "Hoy", time: "08:30", address: "Av. Reforma 123", amount: 6500 },
        { id: "ORD-2", date: "Hoy", time: "09:15", address: "Calle Sol 456", amount: 5200 },
        { id: "ORD-3", date: "Hoy", time: "10:45", address: "Paseo Central 789", amount: 7300 },
        { id: "ORD-4", date: "Hoy", time: "11:30", address: "Avenida Norte 321", amount: 6100 },
        { id: "ORD-5", date: "Hoy", time: "13:00", address: "Calle Comercio 654", amount: 5800 },
        { id: "ORD-6", date: "Hoy", time: "14:20", address: "Pasaje Sur 987", amount: 4700 },
      ],
      chartData: [8, 15, 22, 18, 25, 12, 10],
      chartLabels: ["00h", "04h", "08h", "12h", "16h", "20h", "24h"],
    },
    week: {
      total: 287400,
      orders: 52,
      average: 5527,
      entries: [
        { id: "ORD-W1", date: "Lunes", time: "Múltiples", address: "8 pedidos completados", amount: 45800 },
        { id: "ORD-W2", date: "Martes", time: "Múltiples", address: "7 pedidos completados", amount: 41200 },
        { id: "ORD-W3", date: "Miércoles", time: "Múltiples", address: "8 pedidos completados", amount: 46500 },
        { id: "ORD-W4", date: "Jueves", time: "Múltiples", address: "7 pedidos completados", amount: 39800 },
        { id: "ORD-W5", date: "Viernes", time: "Múltiples", address: "9 pedidos completados", amount: 52400 },
        { id: "ORD-W6", date: "Sábado", time: "Múltiples", address: "8 pedidos completados", amount: 47200 },
        { id: "ORD-W7", date: "Domingo", time: "Múltiples", address: "5 pedidos completados", amount: 34500 },
      ],
      chartData: [45, 41, 46, 39, 52, 47, 34],
      chartLabels: ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"],
    },
    month: {
      total: 1118500,
      orders: 210,
      average: 5326,
      entries: [
        { id: "ORD-M1", date: "Semana 1", time: "287.4K", address: "52 pedidos", amount: 287400 },
        { id: "ORD-M2", date: "Semana 2", time: "298.2K", address: "56 pedidos", amount: 298200 },
        { id: "ORD-M3", date: "Semana 3", time: "276.8K", address: "51 pedidos", amount: 276800 },
        { id: "ORD-M4", date: "Semana 4", time: "256.1K", address: "51 pedidos", amount: 256100 },
      ],
      chartData: [287, 298, 276, 256],
      chartLabels: ["Sem 1", "Sem 2", "Sem 3", "Sem 4"],
    },
  };

  const current = earningsData[filter];
  const maxValue = Math.max(...current.chartData);

  const handleViewHistory = () => {
    // Navigate to full history (would be a new page)
    alert("Historial completo de ganancias - Esta pantalla podría mostrar todos los pedidos de todos los tiempos");
  };

  return (
    <div className="min-h-screen bg-white pb-24">
      {/* Header */}
      <header className="flex items-center gap-3 px-4 py-4 border-b animate-fade-in">
        <button
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-secondary rounded-lg transition-colors duration-150 active:scale-95"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-2xl font-semibold">Ganancias</h1>
      </header>

      <main className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* Earnings Banner */}
        <div className="rounded-2xl bg-primary text-primary-foreground p-6 shadow-lg animate-slide-in-up" style={{ animationDelay: "50ms" }}>
          <p className="text-sm opacity-90 mb-1">Ganancia total del {filter === "day" ? "día" : filter === "week" ? "semana" : "mes"}</p>
          <div className="flex items-center justify-between">
            <h2 className="text-4xl font-bold">${current.total.toLocaleString("es-CL")}</h2>
            <TrendingUp className="w-10 h-10 opacity-80 animate-bounce-subtle" />
          </div>
          <p className="text-xs opacity-80 mt-2">CLP</p>
        </div>

        {/* Filter Chips */}
        <div className="flex gap-2 justify-center animate-scale-in" style={{ animationDelay: "100ms" }}>
          {(["day", "week", "month"] as FilterType[]).map((f, i) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                filter === f
                  ? "bg-primary text-primary-foreground shadow-md scale-105"
                  : "bg-white border border-border text-foreground hover:bg-secondary active:scale-95"
              }`}
              style={{ transitionDelay: `${i * 30}ms` }}
            >
              {f === "day" ? "Día" : f === "week" ? "Semana" : "Mes"}
            </button>
          ))}
        </div>

        {/* Chart */}
        <div className="rounded-2xl border bg-white p-4 card-animated animate-scale-in" style={{ animationDelay: "150ms" }}>
          <h3 className="text-sm font-semibold mb-4">Distribución de ganancias</h3>
          <div className="flex items-end justify-around h-32 gap-1">
            {current.chartData.map((value, i) => (
              <div
                key={i}
                className="flex flex-col items-center gap-2 flex-1 animate-scale-in"
                style={{
                  animationDelay: `${200 + i * 40}ms`,
                  transformOrigin: "center bottom",
                }}
              >
                <div className="flex-1 flex items-end justify-center w-full">
                  <div
                    className="w-6 bg-primary rounded-t-lg transition-all hover:opacity-80 hover:scale-110"
                    style={{
                      height: `${(value / maxValue) * 100}%`,
                      animation: `slide-in-up 0.5s ease-out forwards`,
                      animationDelay: `${200 + i * 50}ms`,
                    }}
                    title={`${value}K`}
                  />
                </div>
                <span className="text-xs text-muted-foreground text-center">{current.chartLabels[i]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Earnings Details */}
        <div className="rounded-2xl border bg-white p-4 card-animated animate-scale-in" style={{ animationDelay: "250ms" }}>
          <h3 className="text-sm font-semibold mb-3">Detalle de pedidos</h3>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {current.entries.map((entry, idx) => (
              <div
                key={entry.id}
                className="flex items-center justify-between p-3 rounded-xl hover:bg-secondary transition-all duration-200 border border-border/50 card-animated animate-scale-in active:scale-98"
                style={{ animationDelay: `${300 + idx * 60}ms` }}
              >
                <div>
                  <p className="text-sm font-medium">{entry.id}</p>
                  <p className="text-xs text-muted-foreground">
                    {entry.date} • {entry.time}
                  </p>
                  <p className="text-xs text-muted-foreground">{entry.address}</p>
                </div>
                <p className="font-bold text-primary">${entry.amount.toLocaleString("es-CL")}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Summary */}
        <div
          className="rounded-2xl border bg-secondary p-4 card-animated animate-scale-in"
          style={{ animationDelay: "300ms" }}
        >
          <h3 className="text-xs font-medium text-muted-foreground uppercase mb-3">Resumen del período</h3>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-foreground">Ganancia total</span>
              <span className="text-2xl font-bold text-primary">${current.total.toLocaleString("es-CL")} CLP</span>
            </div>
            <div className="border-t pt-2 mt-2 flex justify-between text-sm">
              <span className="text-muted-foreground">Total de pedidos completados: {current.orders}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">
                Promedio por pedido: ${current.average.toLocaleString("es-CL")} CLP
              </span>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <button
          onClick={handleViewHistory}
          className="w-full h-12 rounded-xl bg-primary text-primary-foreground font-semibold shadow hover:shadow-md hover:opacity-95 active:scale-95 transition-all duration-150 btn-ripple animate-scale-in"
          style={{ animationDelay: "350ms" }}
        >
          Ver historial completo
        </button>
      </main>
    </div>
  );
}
