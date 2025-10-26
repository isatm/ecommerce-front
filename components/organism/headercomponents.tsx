'use client';
import { useHeaderComponent } from "@/hooks/useHeader";
import InputComponent from "../atoms/inputComponent";
import Link from "next/link";
import Image from "next/image";
import ToggleButtonComponent from "../atoms/buttons/toggleButtonComponent";
import { Search, Heart } from 'lucide-react'; 
import { navLinkClass } from "@/utils/Tokens";
import Button from "../atoms/buttonComponent";
import React from 'react';
import { useAuth } from "@/contexts/authContext";
import AvatarMenu from "@/components/organism/avatarMenuComponent";

export default function HeaderComponent() {
  const { register, handleSubmit, results, onSubmit, router } = useHeaderComponent();
  const { user, loading } = useAuth();

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
                placeholder="Shop for used & new music gear..."
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
                    Favorites
                  </div>
                </Link>
                {/* Carrito e Iniciar sesión/Registrarse */}
                <Link href="/cart" className="flex flex-col items-center text-black-600 hover:text-orange-500 transition">
                  <div className="relative">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shopping-cart"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
                  </div>
                  <div className="text-xs">
                    Cart
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
            )}
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
              <Link href="#" className={navLinkClass}>Pedals and Amplifiers</Link> 
              <Link href="#" className={navLinkClass}>Keyboards and Synthesizers</Link>
              <Link href="#" className={navLinkClass}>Recording Gear</Link> 
              <Link href="#" className={navLinkClass}>Drums</Link> 
              <Link href="#" className={navLinkClass}>DJ & Audio Equipment</Link> 
              <Link href="#" className={navLinkClass}>More Categories</Link> 
            </div>
            <ToggleButtonComponent
              options={[
                "Guitars",
                "Pedals and Amplifiers",
                "Keyboards and Synthesizers",
                "Recording Gear",
                "Drums",
                "DJ & Audio Equipment",
                "More Categories",
              ]}
              buttonStyle="hidden lg:flex text-black hover:text-orange-500 font-medium py-2 px-4 rounded-lg transition whitespace-nowrap"
              content="View All" 
            />
          </div>

          {/* Marcas y enlaces */}
          <div className="flex hidden lg:flex justify-start whitespace-nowrap gap-1/2 w-1/2">
            <Link href="#" className={navLinkClass}>Brands</Link>
            <Link href="news" className={navLinkClass}>News</Link>
            <Link href="#" className={navLinkClass}>Explore</Link>
            <Link href="news" className={navLinkClass}>Artist Shops</Link>
            <Link href="news" className={navLinkClass}>Reverb Gives</Link>
            <Link href="news" className={navLinkClass}>Help Center</Link>
          </div>
        </div>
      </menu>
    </header>
  );
}