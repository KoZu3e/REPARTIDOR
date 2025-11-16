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
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">El Comilón</h1>
          <p className="text-muted-foreground">Ingresa como repartidor</p>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
          className="space-y-4"
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
            className="w-full h-12 mt-6 rounded-xl bg-primary text-primary-foreground font-semibold shadow hover:opacity-95 active:opacity-90"
          >
            Iniciar Sesión
          </button>
        </form>

        <p className="text-center text-sm text-muted-foreground mt-6">
          Para demostración, usa cualquier email y contraseña
        </p>
      </div>
    </div>
  );
}
