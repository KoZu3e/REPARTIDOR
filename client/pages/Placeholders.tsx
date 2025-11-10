import { Link } from "react-router-dom";

export function Placeholder({ title, description }: { title: string; description: string }) {
  return (
    <div className="min-h-screen pb-24 max-w-md mx-auto px-4 pt-10">
      <h1 className="text-2xl font-semibold mb-2">{title}</h1>
      <p className="text-muted-foreground mb-6">{description}</p>
      <div className="rounded-2xl border bg-secondary p-6">
        <p className="text-sm text-muted-foreground">
          ¿Quieres que construyamos esta pantalla completa ahora? Pídemelo en el chat.
        </p>
        <div className="mt-4 flex gap-2">
          <Link to="/" className="flex-1 h-11 rounded-xl bg-primary text-primary-foreground font-medium grid place-items-center">
            Ir a Inicio
          </Link>
          <Link to="/pedidos" className="flex-1 h-11 rounded-xl bg-muted text-foreground font-medium grid place-items-center">
            Ver Pedidos
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Mapa = () => (
  <Placeholder
    title="Mapa y Dirección"
    description="Mostraremos la ruta óptima, distancia y tiempo estimado, con acciones para iniciar entrega y contactar al cliente."
  />
);

export const Perfil = () => (
  <Placeholder
    title="Perfil del Repartidor"
    description="Aquí podrás editar tu información, foto y preferencias, además de cerrar sesión y verificar tu teléfono."
  />
);

export const Ganancias = () => (
  <Placeholder
    title="Mis Ganancias"
    description="Presentaremos el total del día y filtros por día/semana/mes, con lista de pedidos completados."
  />
);
