"use client";

import Link from "next/link";
import React from 'react';

import InputComponent from "@/components/atoms/inputComponent";
import LoginComponentProps from "@/interfaces/loginInterfaces/loginComponentPropsInterface";
import useLogin from "@/hooks/useLogin";
import Button from "@/components/atoms/buttonComponent";

export default function LoginComponent({ onClose }: LoginComponentProps) {
  const { handleSubmit, register, onErrors, onSubmit } = useLogin();

  return (
    <div className="w-full">
      {/* Botones de continuar con... en columnas, usando el estilo gris */}
      <div className="grid grid-cols-3 gap-2 mb-6"> 
        <Button variant="google" icon={<img src="images/icons/google_logo.png" alt="Google" className="h-5 w-5" />} className="py-2 text-sm px-2"> 
          Google
        </Button>
        <Button variant="google" icon={<img src="images/icons/apple_logo.png" alt="Apple" className="h-5 w-5" />} className="py-2 text-sm px-2"> 
          Apple
        </Button>
        <Button variant="google" icon={<img src="images/icons/facebook_logo.png" alt="Facebook" className="h-5 w-5" />} className="py-2 text-sm px-2"> 
          Facebook
        </Button>
      </div>

      {/* Separador "o" */}
      <div className="relative flex items-center py-5">
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="flex-shrink mx-4 text-gray-500 text-sm">o</span>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>

      <form onSubmit={handleSubmit(onSubmit, onErrors)} className="w-full text-left space-y-4">
        <div>
          <label htmlFor="email" className="font-semibold text-sm block mb-1">Email</label>
          <InputComponent
            label=""
            typeElement="email"
            idElement="email"
            name="user"
            register={register}
            className="border-gray-300 focus:border-orange-500 rounded-md" // Asegúrate de que rounded-md es lo que quieres para el input
          />
        </div>

        <div>
          <label htmlFor="password" className="font-semibold text-sm block mb-1">Contraseña</label>
          <InputComponent
            label=""
            typeElement="password"
            idElement="password"
            name="password"
            register={register}
            className="border-gray-300 focus:border-orange-500 rounded-md"
          />
        </div>

        {/* Checkbox "Quédate ingresado" y "¿Olvidaste tu contraseña?" */}
        <div className="flex items-center justify-between text-sm mt-2">
            <div className="flex items-center">
                <input
                    id="rememberMe"
                    name="rememberMe"
                    type="checkbox"
                    className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                />
                <label htmlFor="rememberMe" className="ml-2 block text-gray-900">
                    Quédate ingresado
                </label>
            </div>
            <Link href="#" className="font-medium text-blue-600 hover:text-blue-800 transition-colors">
                ¿Olvidaste tu contraseña?
            </Link>
        </div>


        {/* Botón de Iniciar sesión oscuro */}
        <Button type="submit" variant="dark" fullWidth className="mt-6 py-3 text-base"> {/* Usar variant="dark" */}
          Iniciar sesión
        </Button>
      </form>
    </div>
  );
}