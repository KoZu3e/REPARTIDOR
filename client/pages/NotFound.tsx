import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary animate-fade-in">
      <div className="text-center animate-scale-in">
        <h1 className="text-4xl font-bold mb-2 animate-slide-in-up">404</h1>
        <p className="text-xl text-muted-foreground mb-4 animate-slide-in-up" style={{ animationDelay: "50ms" }}>
          Oops! Page not found
        </p>
        <Link
          to="/"
          className="text-primary underline font-medium hover:opacity-80 transition-opacity duration-200 animate-slide-in-up inline-block"
          style={{ animationDelay: "100ms" }}
        >
          Volver al Inicio
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
