import "./global.css";

import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Pedidos from "./pages/Pedidos";
import BottomNav from "./components/BottomNav";
import { DeliveryProvider } from "./context/delivery";
import { Ganancias, Mapa, Perfil } from "./pages/Placeholders";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <DeliveryProvider>
      <BrowserRouter>
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
      </BrowserRouter>
    </DeliveryProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
