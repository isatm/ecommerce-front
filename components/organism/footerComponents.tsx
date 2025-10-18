"use client";

import React from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";

import useFooter from "@/hooks/useFooter";
import InputComponent from "../atoms/inputComponent";


export default function FooterComponent() {
    const { register, handleSubmit, onSubmit } = useFooter();

    return (
        <footer className="bg-gray-900 text-white shadow-lg">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-8 p-8 max-w-7xl">
            <div className="text-center md:text-left">
            <h3 className="font-bold text-lg mb-4 text-white-400">Comprar equipo musical</h3>
            <ul className="space-y-2">
                <li><Link href="/categorias" className="hover:text-white cursor-pointer transition-colors">Categorías</Link></li>
                <li><Link href="/marcas" className="hover:text-white cursor-pointer transition-colors">Marcas</Link></li>
                <li><Link href="/ofertas" className="hover:text-white cursor-pointer transition-colors">Ofertas y descuentos</Link></li>
                <li><Link href="/rebajas" className="hover:text-white cursor-pointer transition-colors">Rebajas de precios</Link></li>
                <li><Link href="/nuevos" className="hover:text-white cursor-pointer transition-colors">Nuevo y popular</Link></li>
            </ul>
            </div>

            <div className="text-center md:text-left">
            <h3 className="font-bold text-lg mb-4 text-white-400">Vender en Reverb</h3>
            <ul className="space-y-2">
                <li><Link href="/vendedores" className="hover:text-white cursor-pointer transition-colors">Centro de vendedores</Link></li>
                <li><Link href="/pagos" className="hover:text-white cursor-pointer transition-colors">Preguntas frecuentes sobre Reverb Payments</Link></li>
            </ul>

            <div className="text-center md:text-left mt-6">
                <h3 className="font-bold text-lg mb-4 text-white-400">Recursos</h3>
                <ul className="space-y-2">
                <li><Link href="/noticias" className="hover:text-white cursor-pointer transition-colors">Noticias Reverb</Link></li>
                <li><Link href="/precios" className="hover:text-white cursor-pointer transition-colors">Guía de precios</Link></li>
                </ul>
            </div>
            </div>

            <div className="text-center md:text-left">
            <h3 className="font-bold text-lg mb-4 text-white-400">Ayuda y herramientas</h3>
            <ul className="space-y-2">
                <li><Link href="/ayuda" className="hover:text-white cursor-pointer transition-colors">Centros de ayuda</Link></li>
                <li><Link href="/soporte" className="hover:text-white cursor-pointer transition-colors">Contactar con soporte</Link></li>
                <li><Link href="/proteccion" className="hover:text-white cursor-pointer transition-colors">Protección de Reverb</Link></li>
                <li><Link href="/apps" className="hover:text-white cursor-pointer transition-colors">Aplicaciones móviles</Link></li>
                <li><Link href="/api" className="hover:text-white cursor-pointer transition-colors">Integraciones y API</Link></li>
                <li><Link href="/afiliados" className="hover:text-white cursor-pointer transition-colors">Programa de afiliación</Link></li>
                <li><Link href="/privacidad" className="hover:text-white cursor-pointer transition-colors">Configuración de privacidad</Link></li>
            </ul>
            </div>

            <div className="text-center md:text-left">
            <h3 className="font-bold text-lg mb-4 text-white-400">Empresa</h3>
            <ul className="space-y-2">
                <li><Link href="/acerca" className="hover:text-white cursor-pointer transition-colors">Acerca de Reverb</Link></li>
                <li><Link href="/empleo" className="hover:text-white cursor-pointer transition-colors">Empleo</Link></li>
                <li><Link href="/prensa" className="hover:text-white cursor-pointer transition-colors">Prensa</Link></li>
                <li><Link href="/gives" className="hover:text-white cursor-pointer transition-colors">Reverb Gives</Link></li>
                <li><Link href="/seguridad" className="hover:text-white cursor-pointer transition-colors">Confianza y seguridad</Link></li>
            </ul>
            </div>
            
            {/*Utilizamos el input component dado por el profesor y mejorado por los estudiantes*/}
            <div>
            <h3 className="font-bold text-lg mb-4 text-white-400"> Recibe lo mejor de Reverb en tu bandeja de entrada </h3>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-120 sm:flex-row gap text-black font-medium rounded-lg transition">
                <InputComponent
                label=""
                typeElement="text"
                idElement="search"
                name="search"
                register={register}
                />
                <button type="submit" className="bg-white text-black font-medium px-6 py-2 rounded-md hover:bg-gray-200 rounded-lg transition">
                Suscribir
                </button>
            </form>
            <h5 className="text-xs text-gray-500 mt-2">
                Al hacer clic en Suscribir, acepto recibir ofertas y promociones exclusivas,
                noticias y reseñas, además de consejos personalizados para comprar y vender en Reverb.
            </h5>
            </div>
        </div>

        <div className="bg-black p-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6 max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 justify-center md:justify-start text-center md:text-left">
                <span className="bg-gray-800 px-3 py-1 rounded-md">Colombia</span>
                <span className="bg-gray-800 px-3 py-1 rounded-md">Español</span>
                <span className="bg-gray-800 px-3 py-1 rounded-md">USD</span>

                
            <div className="text-center md:text-left mt-6 md:mt-0">
                <h4 className="text-sm m">
                © 2025 Reverb.com LLC. <Link href="/" className="text-gray-400 hover:underline">Términos y políticas</Link>
                <p className="text-sm m">
                    <Link href="/" className="text-gray-400 hover:underline">Política de privacidad</Link> </p>
                </h4>
            </div>

            </div>

            <div className="text-center">
                <h4 className="font-bold text-white-400 mb-2">Reverb Gives</h4>
                <p className="text-gray-400 text-sm">
                Sus compras permiten que algunos programas de música juveniles obtengan el equipo que necesitan para hacer su música.
                </p>
            </div>
            </div>
        </div>
        </footer>
    );
}
