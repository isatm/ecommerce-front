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
            <label
                htmlFor="Nombre"
                className="block text-sm font-medium text-gray-700 mb-1"
            >
                Nombre
            </label>
            <InputComponent
                label="Introduce el nombre"
                typeElement="text"
                idElement="name"
                name="name"
                register={register}
            />

            <label
                htmlFor="Apellido"
                className="block text-sm font-medium text-gray-700 mb-1"
            >
                Apellido
            </label>
            <InputComponent
                label="Introduce el/los apellido/s"
                typeElement="text"
                idElement="lastsame"
                name="lastname"
                register={register}
            />

            <label
                htmlFor="Correo electrónico"
                className="block text-sm font-medium text-gray-700 mb-1"
            >
                Correo electrónico
            </label>
            <InputComponent
                label="Introduce el email"
                typeElement="text"
                idElement="email"
                name="email"
                register={register}
            />

            <label
                htmlFor="Confirmación de email"
                className="block text-sm font-medium text-gray-700 mb-1"
            >
                Confirmación de email
            </label>
            <InputComponent
                label="Comfirmación de correo"
                typeElement="text"
                idElement="email"
                name="email"
                register={register}
            />

            <label
                htmlFor="Contraseña"
                className="block text-sm font-medium text-gray-700 mb-1"
            >
                Contraseña
            </label>
            <InputComponent
                label="Introduce la contraseña"
                typeElement="password"
                idElement="password"
                name="password"
                register={register}
            />

            <ButtonComponent
                type="submit"
                className="w-full bg-black hover:bg-black text-white font-medium py-2 rounded-lg transition"
            >
                Registrarse
            </ButtonComponent>
        </form>
    );
}
