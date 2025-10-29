'use client';

import Link from "next/link";
import Image from "next/image";
import { Search, Heart } from 'lucide-react'; 
import React from 'react';

import { useHeaderComponent } from "@/hooks/useHeader";
import { navLinkClass } from "@/utils/tokensUtils";
import { useAuth } from "@/contexts/authContext";

import InputComponent from "../atoms/inputComponent";
import AvatarMenu from "@/components/organism/avatarMenuComponent";
import Button from "../atoms/buttonComponent";

export default function HeaderComponent() {
  const { register, handleSubmit, results, onSubmit, router } = useHeaderComponent();
  const { user, loading } = useAuth();

  return (
    <header className="w-full">
      {/* HEADER SUPERIOR */}
      <header className="bg-white shadow-sm h-18 px-6 border-b border-gray-200 w-full">
        <nav className="flex gap-6 font-medium items-center h-full justify-between max-w-7xl mx-auto">
          {/* Logo */}
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

          {/* Input con sugerencias - tamaño reducido */}
          <div className="flex-1 max-w-2xl relative">
            <form onSubmit={handleSubmit(onSubmit)} className="flex-1">
              <InputComponent
                label=""
                typeElement="search"
                idElement="search"
                name="search"
                register={register}
                placeholder="Busca equipos musicales usados y nuevos..."
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

          {/* Botones / AvatarMenu condicional */}
          <div className="flex items-center gap-4">
            <Link href="/dashboard/seller/listings/create" >
              <Button variant="primary">
                Vende tu equipo
              </Button>
            </Link>
            
            {loading ? (
              <div className="flex items-center gap-4">
                <div className="w-16 h-6 bg-gray-200 rounded animate-pulse"></div>
                <div className="w-16 h-6 bg-gray-200 rounded animate-pulse"></div>
              </div>
            ) : user ? (
              <AvatarMenu />
            ) : (
              <div className="flex items-center gap-4">
                <Link href="/favorites" className="flex flex-col items-center text-black-600 hover:text-orange-500 transition">
                  <Heart />
                  <div className="text-xs">
                    Favoritos
                  </div>
                </Link>
                {/* Carrito e Iniciar sesión/Registrarse */}
                <Link href="/cart" className="flex flex-col items-center text-black-600 hover:text-orange-500 transition">
                  <div className="relative">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shopping-cart"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
                  </div>
                  <div className="text-xs">
                    Carrito
                  </div>
                </Link>
                <div className="flex text-sm hidden lg:flex ">
                  <Link
                    href="/signup"
                    className="text-black hover:text-orange-500 font-medium py-2 px-4 rounded-lg transition"
                  >
                    Registrarse
                  </Link>
                  <Link
                    href="/signin"
                    className="text-black hover:text-orange-500 font-medium py-2 px-4 rounded-lg transition"
                  >
                    Iniciar sesión
                  </Link>
                </div>
              </div>
            )}
          </div>
        </nav>
      </header>

      {/* HEADER INFERIOR - ESTILO REVERB ORIGINAL */}
      <menu className="bg-white shadow-sm h-10 border-b border-gray-200 w-full text-xs">
        <div className="flex justify-between items-center h-full max-w-7xl mx-auto px-6">
          {/* Lado izquierdo - Categorías principales */}
          <div className="flex items-center gap-4">
            <Link href="#" className={`${navLinkClass} whitespace-nowrap`}>Guitarras</Link>
            <Link href="#" className={`${navLinkClass} whitespace-nowrap`}>Pedales y amplificadores</Link> 
            <Link href="#" className={`${navLinkClass} whitespace-nowrap`}>Teclados y sintetizadores</Link>
            <Link href="#" className={`${navLinkClass} whitespace-nowrap`}>Equipo de grabación</Link> 
            <Link href="#" className={`${navLinkClass} whitespace-nowrap`}>Baterías</Link> 
            <Link href="#" className={`${navLinkClass} whitespace-nowrap`}>Equipos de DJ y audio</Link> 
            <div className="flex items-center gap-4">
              <Link href="#" className={`${navLinkClass} whitespace-nowrap`}>Más categorías</Link>
              <span className="text-gray-300">•</span>
            </div>
          </div>

          {/* Lado derecho - Enlaces secundarios */}
          <div className="flex items-center gap-4">
            <Link href="#" className={`${navLinkClass} whitespace-nowrap`}>Marcas</Link>
            <Link href="news" className={`${navLinkClass} whitespace-nowrap`}>Noticias</Link>
            <Link href="#" className={`${navLinkClass} whitespace-nowrap`}>Explorar</Link>
          </div>
        </div>
      </menu>
    </header>
  );
}