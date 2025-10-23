'use client'
import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { supabase } from "@/libs/supabaseClient";

type User = {
    name: string;
    role: 'admin' | 'user' | 'buyer' | 'seller';
    token: string;
    email: string;
    lastname: string;
}

type AuthContextType = {
    user: User | null;
    singIn: (userData: User) => void;
    signOut: () => void;
    loading: boolean;

};

const AuthContext = createContext<AuthContextType>({
    user: null,
    singIn: () => {},
    signOut: () => {},
    loading: true,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) =>{
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const token = Cookies.get("token");
        if (token) {
            supabase.auth.getUser().then(({ data: { user }, error }) => {
                if (user) {
                    const userData: User = {
                        name: user.user_metadata.name || "",
                        role: user.user_metadata.role || "user",
                        token: token,
                        email: user.email || "",
                        lastname: user.user_metadata.lastname || "",
                    };
                    setUser(userData);

            } else {
                setUser(null);
            }});
        } else {
            setLoading(false);
        }
    }, []);


    const singIn = (userData: User) => {
        Cookies.set("token", userData.token, 
            { expires: 70000, 
            secure: true, 
            sameSite: "strict"
        });
        setUser(userData);
    }

    const signOut = () => {
        Cookies.remove("token");
        supabase.auth.signOut();
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ user, singIn, signOut, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;