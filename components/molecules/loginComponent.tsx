'use client'

import { useForm, SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import Cookies from "js-cookie"

import { LoginDTO } from "@/interfaces/login"
import { loginScheme } from "@/schemas/login"
import { loginService } from "@/libs/authService"

import InputComponent from "@/components/atoms/inputComponent"
import ButtonComponent from "@/components/atoms/buttonComponent"
import { supabase } from "@/libs/supabaseClient"

export default function LoginComponent() {
  const { 
    register, 
    handleSubmit,
    formState: { errors }
  } = useForm<LoginDTO>({
    resolver: zodResolver(loginScheme)
  })
  
const onSubmit: SubmitHandler<LoginDTO> = async (data) => {
  try {
    const { user, password } = data

    // Reconvertir
    const { data: loginData, error } = await supabase.auth.signInWithPassword({
      email: user,
      password,
    })

    if (error) throw error

    // Guardar token en cookie
    if (loginData.session) {
      Cookies.set("token", loginData.session.access_token, {
        expires: 7,
        secure: true,
        sameSite: "strict",
      })
      console.log("Login correcto ✅")
    }
  } catch (err) {
    console.error("Error en login ❌", err)
  }
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
      type={3}
      content="Iniciar sesión"
      />
    </form>
  )
}
