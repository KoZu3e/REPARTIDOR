import "./global.css";

import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/auth";
import { DeliveryProvider } from "./context/delivery";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Pedidos from "./pages/Pedidos";
import Login from "./pages/Login";
import Perfil from "./pages/Perfil";
import Mapa from "./pages/Mapa";
import Ganancias from "./pages/Ganancias";
import BottomNav from "./components/BottomNav";

const queryClient = new QueryClient();

const AppRoutes = () => {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  return (
    <div className="pb-16">
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/pedidos" element={<Pedidos />} />
        <Route path="/mapa" element={<Mapa />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/ganancias" element={<Ganancias />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <BottomNav />
    </div>
  );
};

const App = () => (
  <AuthProvider>
    <QueryClientProvider client={queryClient}>
      <DeliveryProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </DeliveryProvider>
    </QueryClientProvider>
  </AuthProvider>
);

export default App;
