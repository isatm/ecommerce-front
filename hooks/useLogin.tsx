"use client"

import { LoginDTO } from "@/interfaces/login";
import { loginService } from "@/libs/loginService";
import { loginScheme } from "@/schemas/login";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAuth } from "./useAuth"; 

export function useLogin() {
    const router = useRouter();
    const { 
        register, 
        handleSubmit,
        formState: { errors }
    } = useForm<LoginDTO>({
        resolver: zodResolver(loginScheme)
    });

    const { singIn } = useAuth(); 
        
    const onSubmit: SubmitHandler<LoginDTO> = async (data) => {
        try {
            const loginData = await loginService(data);

            if (loginData.session && loginData.user) {
                const userData = {
                    name: loginData.user.user_metadata.name || "",
                    role: loginData.user.user_metadata.role || "user", 
                    token: loginData.session.access_token,
                    email: loginData.user.email || "",
                    lastname: loginData.user.user_metadata.lastname || "",
                };
                
                singIn(userData); 

                alert("Login correcto");

                router.refresh();
                router.push("/dashboard"); 
            } else {
                alert("Error: No se pudo obtener la sesión o los datos del usuario.");
            }
        } catch (err: any) { 
            console.error("Error en login:", err);
            alert("Usuario o contraseña incorrectos");
        }
    };
        
    const onErrors = () => {
        console.log("Errores", errors);
        alert("Información incompleta");
    };

    return {
        handleSubmit, register, onSubmit, onErrors
    }
}

export default useLogin;