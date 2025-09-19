'use client'

import { useForm, SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { RegisterDTO } from "@/interfaces/register"
import { RegisterScheme } from "@/schemas/register"

import InputComponent from "@/components/atoms/inputComponent"
import ButtonComponent from "@/components/atoms/buttonComponent"
import { registerService } from "@/libs/authService"

import { useRouter } from "next/navigation";


export default function RegisterComponent() {
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

    alert("Registro exitoso. Revisa tu correo para confirmar tu cuenta.");
    router.push("/login");

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
                name="name"
                register={register}
            />

            <InputComponent
                label="Introduce el/los apellido/s"
                typeElement="text"
                idElement="lastsame"
                name="lastname"
                register={register}
            />

            <InputComponent
                label="Introduce el email"
                typeElement="email"
                idElement="email"
                name="email"
                register={register}
            />

            <InputComponent
            label="Confirmación de correo"
            typeElement="text"
            idElement="confirmEmail"
            name="confirmEmail"
            register={register}
            />


            <InputComponent
                label="Introduce la contraseña"
                typeElement="password"
                idElement="password"
                name="password"
                register={register}
            />

            <ButtonComponent
                type={3}
                content="Registrarse"
            />

        </form>
    );
}
