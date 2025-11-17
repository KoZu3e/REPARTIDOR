import { useState } from "react";
import { useAuth } from "@/context/auth";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (email && password) {
      login(email, password);
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4 animate-fade-in">
      <div className="w-full max-w-sm animate-scale-in">
        <div className="text-center mb-8 animate-slide-in-up" style={{ animationDelay: "50ms" }}>
          <h1 className="text-3xl font-bold text-foreground mb-2">El Comilón</h1>
          <p className="text-muted-foreground">Ingresa como repartidor</p>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
          className="space-y-4 animate-scale-in"
          style={{ animationDelay: "100ms" }}
        >
          <div>
            <label className="text-sm font-medium text-foreground">Correo Electrónico</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@correo.com"
              className="w-full mt-2 px-4 py-3 rounded-xl border bg-white text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-foreground">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full mt-2 px-4 py-3 rounded-xl border bg-white text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <button
            type="submit"
            className="w-full h-12 mt-6 rounded-xl bg-primary text-primary-foreground font-semibold shadow hover:shadow-md hover:opacity-95 active:scale-95 transition-all duration-150 btn-ripple"
          >
            Iniciar Sesión
          </button>
        </form>

        <p className="text-center text-sm text-muted-foreground mt-6 animate-fade-in" style={{ animationDelay: "200ms" }}>
          Para demostración, usa cualquier email y contraseña
        </p>
      </div>
    </div>
  );
}
