"use client";
import InputComponent from "@/components/atoms/inputComponent";
import { useRegister } from "@/hooks/useRegister";
import Button from "@/components/atoms/buttonComponent"; // Asegúrate de importar Button
import Link from "next/link"; // Para los enlaces de Condiciones de uso

export default function RegisterComponent() {
  const { handleSubmit, register, onErrors, onSubmit } = useRegister();

  return (
    <div className="w-full"> 
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

      <form
        onSubmit={handleSubmit(onSubmit, onErrors)}
        className="w-full text-left space-y-4" 
      >
        <div className="flex gap-3">
          <div className="w-1/2">
            <label htmlFor="name" className="font-semibold text-sm block mb-1">Nombre*</label>
            <InputComponent
              label=""
              typeElement="text"
              idElement="name"
              name="name"
              register={register}
              className="border-gray-300 focus:border-orange-500 rounded-md" 
            />
          </div>

          <div className="w-1/2">
            <label htmlFor="lastname" className="font-semibold text-sm block mb-1">Apellido*</label>
            <InputComponent
              label=""
              typeElement="text"
              idElement="lastname"
              name="lastname"
              register={register}
              className="border-gray-300 focus:border-orange-500 rounded-md" 
            />
          </div>
        </div>

        <div>
          <label htmlFor="email" className="font-semibold text-sm block mb-1">Email*</label>
          <InputComponent
            label=""
            typeElement="email"
            idElement="email"
            name="email"
            register={register}
            className="border-gray-300 focus:border-orange-500 rounded-md"
          />
        </div>

        <div>
          <label htmlFor="password" className="font-semibold text-sm block mb-1">Contraseña*</label>
          <InputComponent
            label=""
            typeElement="password"
            idElement="password"
            name="password"
            register={register}
            className="border-gray-300 focus:border-orange-500 rounded-md" 
          />
          {/* Mensaje de requisitos de contraseña */}
          <p className="text-xs text-gray-500 mt-1">
            Debe contener 12 caracteres como mínimo, incluyendo al menos una letra en
            mayúsculas, otra en minúsculas, un número y un carácter especial.
          </p>
        </div>

        {/* Botón de Registrarse */}
        <Button type="submit" variant="dark" fullWidth className="mt-6 py-3 text-base">
          Registrarse
        </Button>
        </form>

        {/* Mensaje de reCAPTCHA y Checkboxes */}
        <div className="mt-6 text-sm text-gray-600 space-y-4"> 
          <p className="text-xs text-gray-500 leading-relaxed">
            Este sitio cuenta con la protección de reCAPTCHA Enterprise. Además, se aplican la{" "}
            <Link href="#" className="underline text-blue-600 hover:text-blue-800">
              Política de privacidad
            </Link>{" "}
            y los{" "}
            <Link href="#" className="underline text-blue-600 hover:text-blue-800">
              Términos de servicio
            </Link>{" "}
            de Google.
          </p>

          <div className="flex items-start"> 
            <input
              id="receiveNews"
              name="receiveNews"
              type="checkbox"
              className="mt-1 h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
            />
            <label htmlFor="receiveNews" className="ml-2 block text-gray-900 leading-tight">
              Recibe las últimas noticias y promociones por correo electrónico
            </label>
          </div>

          <div className="flex items-start">
            <input
              id="acceptTerms"
              name="acceptTerms"
              type="checkbox"
              className="mt-1 h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
            />
            <label htmlFor="acceptTerms" className="ml-2 block text-gray-900 leading-tight">
              Al hacer clic en "Registrarse", acepto expresamente las{" "}
              <Link href="#" className="underline text-blue-600 hover:text-blue-800">
                Condiciones de uso
              </Link>{" "}
              y la{" "}
              <Link href="#" className="underline text-blue-600 hover:text-blue-800">
                Política de privacidad
              </Link>{" "}
              de Reverb.
            </label>
          </div>
        </div>
    </div>
  );
}