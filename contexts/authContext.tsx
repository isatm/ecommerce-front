"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { User } from "@/interfaces/user";

export type AuthContextType = {
  user: User | null;
  signIn: (userData: User) => void;
  signOut: () => void;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const cookieOptions: Cookies.CookieAttributes = {
  expires: 7,
  path: "/",
  sameSite: "lax",
  secure: process.env.NODE_ENV === "production",
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userCookie = Cookies.get("user");
    const token = Cookies.get("token");

    if (userCookie && token) {
      try {
        const parsed = JSON.parse(userCookie) as User;
        setUser(parsed);
      } catch {
        Cookies.remove("user");
        Cookies.remove("token");
      }
    }
    setLoading(false);
  }, []);

  const signIn = (userData: User) => {
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
    <AuthContext.Provider value={{ user, signIn, signOut, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}
