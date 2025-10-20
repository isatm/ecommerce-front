'use client'

import { registerService } from "@/libs/registerService"
import { useRouter } from "next/navigation";


import { useForm, SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { RegisterDTO } from "@/interfaces/register"
import { RegisterScheme } from "@/schemas/register"


export function useRegisterComponent(){
    const router = useRouter();
    const {
    register,
    handleSubmit,
    formState: { errors }
    } = useForm<RegisterDTO>({
        resolver: zodResolver(RegisterScheme)
    });

    const onSubmit: SubmitHandler<RegisterDTO> = async (data) => {
        const result = await registerService(data);
        if (!result) {
            alert("Hubo un error al registrarse. Inténtalo de nuevo.");
            return;
        }
    };

    const onErrors = () => {
        console.log("Errores", errors);
        alert("Información incompleta");
    };

    return{onErrors, onSubmit, register, handleSubmit}

}