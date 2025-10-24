'use client';
import { useHeaderComponent } from "@/hooks/useHeader";
import InputComponent from "../atoms/inputComponent";
import Link from "next/link";
import Image from "next/image";
import ToggleButtonComponent from "../atoms/buttons/toggleButtonComponent";
import { Search, ShoppingCart } from 'lucide-react';
import { Heart } from 'lucide-react';
import { navLinkClass } from "@/utils/Tokens";
import Button from "../atoms/buttonComponent"; 
import React from 'react'; 

export default function HeaderComponent() {
  const { register, handleSubmit, results, onSubmit, router } = useHeaderComponent();

  return (
    <header className="w-full">
      {/* HEADER SUPERIOR */}
      <header className="bg-white shadow-sm h-18 px-6 border-b border-gray-200 w-full">
        <nav className="flex gap-6 font-medium items-center h-full">
          {/* Logo + Input */}
          <div className="flex items-center">
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
                typeElement="search" 
                idElement="search"
                name="search"
                register={register}
                placeholder="Compra equipos musicales usados & nuevos..."
                className="w-full" 
                iconRight={<Search size={18} />} 
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
            <Button variant="primary">
              Vende tu equipo
            </Button>

            <Link href="favorites" className="flex flex-col items-center text-black-600 hover:text-orange-500 transition">
              <Heart />
              <div className="text-xs">
              Favoritos
              </div>
            </Link>
            <Link href="cart" className="flex flex-col items-center text-black-600 hover:text-orange-500 transition">
              <ShoppingCart />
              <div className="text-xs">
              Carrito
              </div>
            </Link>
            <div className="flex text-sm hidden lg:flex ">
              <Link
                href="/singup"
                className="text-black hover:text-orange-500 font-medium py-2 px-4 rounded-lg transition"
              >
                Registrarse
              </Link>
              <Link
                href="/singin"
                className="text-black hover:text-orange-500 font-medium py-2 px-4 rounded-lg transition"
              >
                Iniciar sesión
              </Link>
            </div>
          </div>
        </nav>
      </header>

      {/* HEADER INFERIOR */}
      <menu className="bg-white shadow-sm h-10 px-6 border-b border-gray-200 w-full text-xs">
        <div className="flex">
          {/* Categorías */}
          <div className="flex w-1/2">
            <div className="flex hidden lg:flex gap-2 justify-start whitespace-nowrap overflow-hidden">
              <Link href="#" className={navLinkClass}>Guitarras</Link>
              <Link href="#" className={navLinkClass}>Pedales y amplificadores</Link>
              <Link href="#" className={navLinkClass}>Teclados y Sintetizadores</Link>
              <Link href="#" className={navLinkClass}>Equipo de grabación</Link>
              <Link href="#" className={navLinkClass}>Baterias</Link>
              <Link href="#" className={navLinkClass}>Equipo Dj y audio</Link>
              <Link href="#" className={navLinkClass}>Más categorías</Link>
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
              buttonStyle="hidden lg:flex text-black hover:text-orange-500 font-medium py-2 px-4 rounded-lg transition whitespace-nowrap"
              content="Ver todo"
            />
          </div>

          {/* Marcas y enlaces */}
          <div className="flex hidden lg:flex justify-start whitespace-nowrap gap-1/2 w-1/2">
            <Link href="#" className={navLinkClass}>Marcas</Link>
            <Link href="news" className={navLinkClass}>Noticias</Link>
            <Link href="#" className={navLinkClass}>Explorar</Link>
            <Link href="news" className={navLinkClass}>Tiendas de artistas</Link>
            <Link href="news" className={navLinkClass}>Reverb Gives</Link>
            <Link href="news" className={navLinkClass}>Centro de ayuda</Link>
          </div>
        </div>
      </menu>
    </header>
  );
}