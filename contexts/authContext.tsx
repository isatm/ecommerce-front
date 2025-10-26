"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

export type User = {
  id: number;
  name: string;
  role: "admin" | "user" | "buyer" | "seller";
  token: string;
  email: string;
  lastname: string;
};

export type AuthContextType = {
  user: User | null;
  singIn: (userData: User) => void;
  signOut: () => void;
  loading: boolean;
};

// Inicializamos con undefined para detectar uso fuera del provider
const AuthContext = createContext<AuthContextType | undefined>(undefined);

const cookieOptions: Cookies.CookieAttributes = {
  expires: 7,
  path: "/",
  sameSite: "lax",
  // secure: process.env.NODE_ENV === "production" // opcional: activar en producción
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userCookie = Cookies.get("user");
    const token = Cookies.get("token");

    if (userCookie) {
      try {
        const parsed: User = JSON.parse(userCookie);
        setUser(parsed);
      } catch (err) {
        Cookies.remove("user");
        setUser(null);
      }
    } else if (token) {
      // Si existe token pero no user cookie, mantenemos null (podrías fetch al backend si deseas)
      setUser(null);
    } else {
      setUser(null);
    }
    setLoading(false);
  }, []);

  const singIn = (userData: User) => {
    Cookies.set("token", userData.token, cookieOptions);
    Cookies.set("user", JSON.stringify(userData), cookieOptions);
    setUser(userData);
  };

  const signOut = () => {
    Cookies.remove("token");
    Cookies.remove("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, singIn, signOut, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export default AuthProvider;