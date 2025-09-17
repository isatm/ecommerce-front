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
    <header className="bg-white shadow-sm h-18 px-6 shadow-sm border-b border-gray-200 max-w-7xl mx-auto px-4">
      <nav className="flex gap-6 font-medium items-center h-full">
        {/* Logo + Input */}
        
        {/* <div className="flex flex-1">
          <div className="flex items-center flex-1">
            <Link href="/" className="-m-1.5 p-1.5 flex items-center">
              <Image
                src="https://solidsound.wpenginepowered.com/wp-content/uploads/2019/02/Reverb-Logo-Black_square-1-300x177.png"
                alt="Reverb Logo"
                className="h-17 w-auto mr-4"
                width={100}
                height={100}
              />
            </Link>
             <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex-1 hidden md:flex"
          >
            <InputComponent
              label=""
              typeElement="text"
              idElement="search"
              name="search"
              register={register}
            />
          </form>
            
          </div>
        </div> */}
        <div className="flex items-center">
          <div className="block lg:hidden mr-4">
          hola
          </div>
          <Link href="/" className="-m-1.5 p-1.5 flex items-center">
              <Image
                src="https://solidsound.wpenginepowered.com/wp-content/uploads/2019/02/Reverb-Logo-Black_square-1-300x177.png"
                alt="Reverb Logo"
                className="h-17 w-auto mr-4"
                width={100}
                height={100}
              />
            </Link>
        </div>
        <div className="flex-1">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex-1 "
          >
            <InputComponent
              label=""
              typeElement="text"
              idElement="search"
              name="search"
              register={register}
            />
          </form>
        </div>

        {/* Botones */}
        <div className="flex items-center gap-4">
          <a href="sellsearch" className="bg-orange-500 text-white font-bold py-3 px-6 rounded-full hover:bg-orange-600 transition">
              Vende tu equipo
          </a>
          <div className="flex text-sm hidden lg:flex gap-6">
            <a href="register">
            <ButtonComponent type={1} content="Registrarse" />
            </a>
            <a href="login">
              <ButtonComponent type={1} content="Iniciar sesión" />
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}
