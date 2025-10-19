'use client';
import { useHeaderComponent } from "@/hooks/useHeader"; 
import ButtonComponent from "../atoms/buttonComponent";
import InputComponent from "../atoms/inputComponent";
import Link from "next/link";
import Image from "next/image";
import ToggleButtonComponent from "../atoms/buttons/toggleButtonComponent";
import EmerPageButton from "../atoms/buttons/emerPageButtonComponent";
import LoginPage from "@/app/(auth)/login/page";
import RegisterPage from "@/app/(auth)/register/page";
import { ShoppingCart } from 'lucide-react';
import { Heart } from 'lucide-react';

export default function HeaderComponent() {
  const { register, handleSubmit, results, onSubmit, router } = useHeaderComponent();
  
  return (
    <header className="w-full">
      {/* HEADER SUPERIOR */}
      <header className="bg-white shadow-sm h-18 px-6 border-b border-gray-200 w-full">
        <nav className="flex gap-6 font-medium items-center h-full">
          {/* Logo + Input */}
          <div className="flex items-center">
            <div className="block lg:hidden mr-4">
              <ButtonComponent type={4} icon="TextAlignJustify" />
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

          {/* Input con sugerencias */}
          <div className="flex-1 relative">
            <form onSubmit={handleSubmit(onSubmit)} className="flex-1">
              <InputComponent
                label=""
                typeElement="text"
                idElement="search"
                name="search"
                register={register}
              />
            </form>

            {results.length > 0 && (
              <ul className="absolute bg-white border rounded-md shadow-md mt-1 w-full z-50">
                {results.map((product) => (
                  <li
                    key={product.id}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => router.push(`/products/${product.id}`)}
                  >
                    {product.name}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Botones */}
          <div className="flex items-center gap-4">
            <a
              href="sellsearch"
              className="bg-orange-500 text-white font-bold py-3 px-6 rounded-full hover:bg-orange-600 transition"
            >
              Vende tu equipo
            </a>
            <a href="favorites" className="flex flex-col items-center text-black-600 hover:text-orange-400 transition">
              <Heart />
              <div className="text-xs">
              Favoritos
              </div>
            </a>
            <a href="cart" className="flex flex-col items-center text-black-600 hover:text-orange-400 transition">
              <ShoppingCart />
              <div className="text-xs">
              Carrito
              </div>
            </a>
            <div className="flex text-sm hidden lg:flex ">
              <EmerPageButton buttonLabel="Registrarse" buttonStyle="text-black hover:text-orange-400 font-medium py-2 px-4 rounded-lg transition">
                <RegisterPage />
              </EmerPageButton>
              

              <EmerPageButton buttonLabel="Iniciar sesión" buttonStyle="text-black hover:text-orange-400 font-medium py-2 px-4 rounded-lg transition">
                <LoginPage />
              </EmerPageButton>
            </div>
          </div>
        </nav>
      </header>

      {/* MENU INFERIOR */}
      <menu className="bg-white shadow-sm h-10 px-6 border-b border-gray-200 w-full text-xs">
        <div className="flex   ">
          {/* Categorías */}
          <div className="flex w-1/2">
            <div className="flex hidden lg:flex gap-2 justify-start whitespace-nowrap overflow-hidden">
            <ButtonComponent type={1} content="Guitarras" />
            <ButtonComponent type={1} content="Pedales y amplificadores" />
            <ButtonComponent type={1} content="Teclados y Sintetizadores" />
            <ButtonComponent type={1} content="Equipo de grabación" />
            <ButtonComponent type={1} content="Baterias" />
            <ButtonComponent type={1} content="Equipo Dj y audio" />
            <ButtonComponent type={1} content="Más categorías" />
          </div>
            <ToggleButtonComponent
              options={[
                "Guitarras",
                "Pedales y amplificadores",
                "Teclados y Sintetizadores",
                "Equipo de grabación",
                "Baterias",
                "Equipo Dj y audio",
                "Más categorías",
              ]}
              buttonStyle="hidden lg:flex text-black hover:text-orange-400 font-medium py-2 px-4 rounded-lg transition whitespace-nowrap"
              content="Ver todo"
            />
          </div>

          {/* Marcas y enlaces */}
          <div className="flex  hidden lg:flex  justify-start whitespace-nowrap gap-1/2 w-1/2">
            <ButtonComponent type={1} content="Marcas" />
            <a
              href="news"
              className="text-black hover:text-orange-400 font-medium py-2 px-4 rounded-lg transition"
            >
              Noticias
            </a>
            <ButtonComponent type={1} content="Explorar" />
            <a
              href="news"
              className="text-black hover:text-orange-400 font-medium py-2 px-4 rounded-lg transition"
            >
              Tiendas de artistas
            </a>
            <a
              href="news"
              className="text-black hover:text-orange-400 font-medium py-2 px-4 rounded-lg transition"
            >
              Reverb Gives
            </a>
            <a
              href="news"
              className="text-black hover:text-orange-400 font-medium py-2 px-4 rounded-lg transition"
            >
              Centro de ayuda
            </a>
          </div>
        </div>
      </menu>
    </header>
  );
}