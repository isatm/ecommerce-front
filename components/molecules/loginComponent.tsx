'use client'

import { useForm, SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import Cookies from "js-cookie"

import { LoginDTO } from "@/interfaces/login"
import { loginScheme } from "@/schemas/login"
import { loginService } from "@/libs/authService"

import InputComponent from "@/components/atoms/inputComponent"
import ButtonComponent from "@/components/atoms/buttonComponent"

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

      <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
          Email
      </label>      
      <InputComponent
        label="Introduce el usuario"
        typeElement="text"
        idElement="user"
        name="user"
        register={register}
      />

      <label
            htmlFor="contraseña"
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
        className="w-full bg-yellow-400 hover:bg-yellow-300 text-black font-medium py-2 rounded-lg transition"
      >
        Continuar
      </ButtonComponent>
    </form>
  )
}
