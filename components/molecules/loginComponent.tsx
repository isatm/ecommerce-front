'use client'

import { useForm, SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { LoginDTO } from "@/interfaces/login"
import { loginScheme } from "@/schemas/login"
import { loginService } from "@/libs/authService"

import InputComponent from "@/components/atoms/inputComponent"
import ButtonComponent from "@/components/atoms/buttonComponent"

import { useRouter } from "next/navigation";

interface LoginComponentProps {
  onClose: () => void; // 👈 ahora es opcional
}

export default function LoginComponent({ onClose }: LoginComponentProps) {
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
      onClose();  
      router.push("/");
    } catch (err) {
      alert("Usuario o contraseña incorrectos");
    }
  };

  const onErrors = () => {
    console.log("Errores", errors);
    alert("Información incompleta");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit, onErrors)} className="space-y-4 p-6 max-w-md mx-auto bg-white rounded-lg shadow">
      <InputComponent
        label="Introduce el usuario"
        typeElement="text"
        idElement="user"
        name="user"
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
      content="Iniciar sesión"
      />
    </form>
  )
}
