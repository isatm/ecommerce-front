'use client'
import React, { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

type User = {
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

export const AuthContext = createContext<AuthContextType>({
  user: null,
  singIn: () => {},
  signOut: () => {},
  loading: true,
});

const cookieOptions: Cookies.CookieAttributes = {
  expires: 7, 
  path: "/",
  sameSite: "lax",
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

export default AuthProvider;