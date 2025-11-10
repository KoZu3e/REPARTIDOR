import { NavLink } from "react-router-dom";
import { Home, MapPinned, Package, User2 } from "lucide-react";

const tabClass = ({ isActive }: { isActive: boolean }) =>
  `flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
    isActive ? "text-primary" : "text-muted-foreground"
  }`;

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 inset-x-0 z-50 border-t bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/70">
      <div className="mx-auto max-w-md px-4">
        <div className="grid grid-cols-4 py-2">
          <NavLink to="/" className={tabClass} end>
            <Home className="h-5 w-5" />
            <span>Inicio</span>
          </NavLink>
          <NavLink to="/pedidos" className={tabClass}>
            <Package className="h-5 w-5" />
            <span>Pedidos</span>
          </NavLink>
          <NavLink to="/mapa" className={tabClass}>
            <MapPinned className="h-5 w-5" />
            <span>Mapa</span>
          </NavLink>
          <NavLink to="/perfil" className={tabClass}>
            <User2 className="h-5 w-5" />
            <span>Perfil</span>
          </NavLink>
        </div>
      </div>
    </nav>
  );
}
