import { Link } from "react-router-dom";
import { MapPinned, Package, PiggyBank, User2 } from "lucide-react";
import { useDelivery } from "@/context/delivery";
import { useState } from "react";

export default function Index() {
  const { driverName, status, setStatus } = useDelivery();
  const [available, setAvailable] = useState(status !== "Ocupado" && status !== "En entrega");

  const toggleAvailable = () => {
    const next = !available;
    setAvailable(next);
    setStatus(next ? "Disponible" : "Ocupado");
  };

  return (
    <div className="min-h-screen pb-20">
      <header className="max-w-md mx-auto px-4 pt-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold">¡Hola, {driverName}! 👋</h1>
            <p className="text-sm text-muted-foreground">Inicio Repartidor</p>
          </div>
          <div className="flex items-center gap-2">
            <span
              className={`text-xs px-2 py-1 rounded-full ${
                status === "En entrega"
                  ? "bg-primary/10 text-primary"
                  : available
                  ? "bg-green-100 text-green-700"
                  : "bg-amber-100 text-amber-700"
              }`}
            >
              {status}
            </span>
            <button
              onClick={toggleAvailable}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                available ? "bg-primary" : "bg-gray-300"
              }`}
              aria-label="Cambiar disponibilidad"
            >
              <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform shadow ${
                  available ? "translate-x-5" : "translate-x-1"
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 py-6 space-y-4">
        <section className="grid grid-cols-2 gap-4">
          <Link
            to="/pedidos"
            className="group rounded-2xl bg-secondary p-4 shadow-sm hover:shadow-md transition-all duration-200 active:scale-95 animate-scale-in"
            style={{ animationDelay: "0ms" }}
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-primary/10 text-primary transition-transform duration-200 group-hover:scale-110">
                <Package className="h-5 w-5" />
              </div>
              <div>
                <p className="font-medium">Pedidos Asignados</p>
                <p className="text-xs text-muted-foreground">Revisa y gestiona pedidos</p>
              </div>
            </div>
          </Link>

          <Link
            to="/mapa"
            className="group rounded-2xl bg-secondary p-4 shadow-sm hover:shadow-md transition-all duration-200 active:scale-95 animate-scale-in"
            style={{ animationDelay: "50ms" }}
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-primary/10 text-primary transition-transform duration-200 group-hover:scale-110">
                <MapPinned className="h-5 w-5" />
              </div>
              <div>
                <p className="font-medium">Mapa y Ruta</p>
                <p className="text-xs text-muted-foreground">Encuentra el mejor camino</p>
              </div>
            </div>
          </Link>

          <Link
            to="/ganancias"
            className="group rounded-2xl bg-secondary p-4 shadow-sm hover:shadow-md transition-all duration-200 active:scale-95 animate-scale-in"
            style={{ animationDelay: "100ms" }}
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-primary/10 text-primary transition-transform duration-200 group-hover:scale-110">
                <PiggyBank className="h-5 w-5" />
              </div>
              <div>
                <p className="font-medium">Mis Ganancias</p>
                <p className="text-xs text-muted-foreground">Resumen y filtros</p>
              </div>
            </div>
          </Link>

          <Link
            to="/perfil"
            className="group rounded-2xl bg-secondary p-4 shadow-sm hover:shadow-md transition-all duration-200 active:scale-95 animate-scale-in"
            style={{ animationDelay: "150ms" }}
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-primary/10 text-primary transition-transform duration-200 group-hover:scale-110">
                <User2 className="h-5 w-5" />
              </div>
              <div>
                <p className="font-medium">Perfil</p>
                <p className="text-xs text-muted-foreground">Información personal</p>
              </div>
            </div>
          </Link>
        </section>

        <section className="rounded-2xl bg-white p-4 shadow-sm border animate-scale-in" style={{ animationDelay: "200ms" }}>
          <h2 className="font-semibold mb-2">Consejos</h2>
          <ul className="text-sm text-muted-foreground list-disc ml-5 space-y-1">
            <li>Activa tu disponibilidad para recibir pedidos.</li>
            <li>Revisa el mapa antes de iniciar la entrega.</li>
            <li>Usa mensajes rápidos para comunicarte con el cliente.</li>
          </ul>
        </section>
      </main>
    </div>
  );
}
