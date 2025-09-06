'use client'

import { useForm, SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { RegisterDTO } from "@/interfaces/register"
import { RegisterScheme } from "@/schemas/register"

import InputComponent from "@/components/atoms/inputComponent"
import ButtonComponent from "@/components/atoms/buttonComponent"
import { registerService } from "@/libs/authService"

export default function RegisterComponent() {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<RegisterDTO>({
        resolver: zodResolver(RegisterScheme)
    });

    const onSubmit: SubmitHandler<RegisterDTO> = (data) => {
        registerService(data)
        if (Object.keys(errors).length >1) {
            alert("Por favor, corrige los errores en el formulario.");
            return;
        }
        alert("Datos enviados");
    };

    const onErrors = () => {
        console.log("Errores", errors);
        alert("Información incompleta");
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit, onErrors)}
            className="space-y-4 p-6 max-w-md mx-auto bg-white rounded-lg shadow"
        >
            <InputComponent
                label="Introduce el nombre"
                typeElement="text"
                idElement="name"
                nameRegister="name"
            />

            <InputComponent
                label="Introduce el/los apellido/s"
                typeElement="text"
                idElement="lastsame"
                nameRegister="lastname"
            />

            <InputComponent
                label="Introduce el email"
                typeElement="text"
                idElement="email"
                nameRegister="email"
            />

            <InputComponent
                label="Comfirmación de correo"
                typeElement="text"
                idElement="email"
                nameRegister="email"
            />

            <InputComponent
                label="Introduce la contraseña"
                typeElement="password"
                idElement="password"
                nameRegister="password"
            />

            <ButtonComponent
                type={3}
                content="Registrarse"
            />

        </form>
    );
}
