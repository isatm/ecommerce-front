'use client'

import { useForm, SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import Cookies from "js-cookie"
import {ArrowUp} from "lucide-react"; // Importa el ícono que deseas usar

import { LoginDTO } from "@/interfaces/login"
import { loginScheme } from "@/schemas/login"
import { loginService } from "@/libs/authService"

import InputComponent from "@/components/atoms/inputComponent"
import ButtonComponent from "@/components/atoms/buttonComponent"
import { ar } from "zod/locales"

export default function LoginComponent() {
  const { 
    register, 
    handleSubmit,
    formState: { errors }
  } = useForm<LoginDTO>({
    resolver: zodResolver(loginScheme)
  })
  
  const onSubmit: SubmitHandler<LoginDTO> = (data) => {
    loginService(data)
      .then((info) => {
        // Guardar en cookie (expira en 7 días)
        Cookies.set("token", info.access_token, { expires: 7, secure: true, sameSite: "strict" })
      })
      .catch(() => {
        console.error("Error en solicitud")
      })
  }

  const onErrors = () => {
    console.log("Errores", errors)
    alert("Información incompleta")
  }

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
        type={2}
        content="¿Necesitas ayuda?"
        icon={<ArrowUp size={18} />}
      />
    </form>
  )
}
