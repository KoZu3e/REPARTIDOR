import { createContext, useContext, useMemo, useState, ReactNode } from "react";

interface AuthState {
  isLoggedIn: boolean;
  driverEmail: string;
  login: (email: string, password: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthState | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [driverEmail, setDriverEmail] = useState("josue@elcomillon.app");

  const login = (email: string, password: string) => {
    // Simulated login - accept any non-empty credentials
    if (email && password) {
      setDriverEmail(email);
      setIsLoggedIn(true);
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
    setDriverEmail("");
  };

  const value: AuthState = useMemo(
    () => ({ isLoggedIn, driverEmail, login, logout }),
    [isLoggedIn, driverEmail],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
