"use client";

import InputComponent from "@/components/atoms/inputComponent"
import ButtonComponent from "@/components/atoms/buttonComponent"
import LoginComponentProps from "@/interfaces/loginComponentProps";

import useLogin from "@/hooks/useLogin";


export default function LoginComponent({ onClose }: LoginComponentProps) {
  const {handleSubmit, register, onErrors, onSubmit} = useLogin();

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