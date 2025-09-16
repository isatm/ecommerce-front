"use client";

import ButtonComponent from "../atoms/buttonComponent";
import InputComponent from "../atoms/inputComponent";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

interface SearchForm {
  search: string;
}

export default function HeaderComponent() {
  const { register, handleSubmit } = useForm<SearchForm>();
  const router = useRouter();

  const onSubmit = (data: SearchForm) => {
    router.push(`/products/${data.search}`); 
  };

  return (
    <header className="bg-white shadow-sm">
      <nav className="flex items-center justify-between p-4 lg:px-8">
        {/* Logo + Input */}
        <div className="flex justify-center flex-1">
          <div className="flex items-center gap-6 w-full max-w-2xl">
            <Link href="/" className="-m-1.5 p-1.5 flex items-center">
              <Image
                src="https://solidsound.wpenginepowered.com/wp-content/uploads/2019/02/Reverb-Logo-Black_square-1-300x177.png"
                alt="Reverb Logo"
                className="h-18 w-auto"
              />
            </Link>
            <form onSubmit={handleSubmit(onSubmit)} className="flex-1">
              <InputComponent
                label=""
                typeElement="text"
                idElement="search"
                name="search"
                register={register}
              />
            </form>
          </div>
        </div>

        {/* Botones */}
        <div className="flex lg:flex-1 lg:justify-end lg:items-center lg:gap-x-4">
          <a href="register">
            <ButtonComponent type={1} content="Registrarse" />
          </a>
          <a href="login">
            <ButtonComponent type={1} content="Iniciar sesión" />
          </a>
        </div>
      </nav>
    </header>
  );
}
