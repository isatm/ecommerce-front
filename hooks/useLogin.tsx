"use client"

import { LoginDTO } from "@/interfaces/login";
import { loginService } from "@/libs/loginService";
import { loginScheme } from "@/schemas/login";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";

export function useLogin() {
    const router = useRouter();
    const { 
        register, 
        handleSubmit,
        formState: { errors }
    } = useForm<LoginDTO>({
        resolver: zodResolver(loginScheme)
    });
        
    const onSubmit: SubmitHandler<LoginDTO> = async (data) => {
        try {
        const loginData = await loginService(data);
        alert("Login correcto");
        window.onclose?.(new Event("close")); // Se cambio la linea onclose() por window.onclose?.(), ya que esta esperaba un parametro que no se enviaba así que no 
        // supe solucionarlo así que confié en el consejo de la ia para repararlo de esta manera.
        router.push("/");
        } catch (err) {
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