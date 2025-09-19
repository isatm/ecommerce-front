"use client";

import ButtonComponent from "../atoms/buttonComponent";
import InputComponent from "../atoms/inputComponent";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import ToggleButtonComponent from "../atoms/buttons/toggleButtonComponent";
import EmerPageButton from "../atoms/buttons/emerPageButtonComponent";
import LoginPage from "@/app/(auth)/login/page";
import RegisterPage from "@/app/(auth)/register/page";

import { searchProducts } from "@/libs/productService";
// Importamos hooks para manejar estado y efectos
import { useState, useEffect } from "react";

interface SearchForm {
  search: string;
}

export default function HeaderComponent() {
  // Se añade "watch" para poder observar el valor del input mientras se escribe
  const { register, handleSubmit, watch } = useForm<SearchForm>();
  const router = useRouter();

  // Estado local para guardar resultados de la búsqueda
  const [results, setResults] = useState<any[]>([]);

  // Capturamos en tiempo real lo que el usuario escribe en el input
  const searchTerm = watch("search");

  // Función que consulta el servicio de productos
  const handleSearch = async (term: string) => {
    if (term.length < 2) {
      // Si el término es muy corto, limpiamos resultados
      setResults([]);
      return;
    }
    try {
      // Llamada al servicio que consulta en Supabase
      const products = await searchProducts(term);
      setResults(products);
    } catch (err) {
      console.error(err);
      setResults([]);
    }
  };

  // useEffect se ejecuta cada vez que cambia el valor del input "search"
  useEffect(() => {
    if (searchTerm) {
      handleSearch(searchTerm);
    } else {
      setResults([]); // Si el input queda vacío, limpiamos
    }
  }, [searchTerm]);

  // Al enviar el formulario con Enter
  const onSubmit = (data: { search: string }) => {
    if (results.length > 0) {
      // Redirige al primer producto encontrado
      router.push(`/products/${results[0].id}`);
    } else {
      alert("No se encontraron productos");
    }
  };
  return (
    <header>
      <header className="bg-white shadow-sm h-18 px-6 shadow-sm border-b border-gray-200 max-w-7xl mx-auto px-4">
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

            {/* Lista de resultados */}
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
            <div className="flex text-sm hidden lg:flex gap-6">
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

      <menu className="bg-white shadow-sm h-10 px-6 shadow-sm border-b border-gray-200 max-w-7xl mx-auto px-4">
        <div className="flex h-screen gap-4">
          <div className="w-1/2 flex text-sm hidden lg:flex border-gray-200 justify-center">
            <ButtonComponent type={1} content="Guitarras" />
            <ButtonComponent type={1} content="Pedales y amplificadores" />
            <ButtonComponent type={1} content="Teclados y Sintetizadores" />
            <ButtonComponent type={1} content="Equipo de grabación" />
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
              buttonStyle="text-black hover:text-orange-400 font-medium py-2 px-4 rounded-lg transition"
              content="Ver todo"
            />
          </div>
          <div className="w-1/2 flex text-sm hidden lg:flex border-gray-200 justify-center">
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
