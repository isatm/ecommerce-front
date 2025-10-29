'use client';

import CartComponent from "@/components/molecules/cartComponent";

export default function CartPage() {
    return (
        <main className="min-h-screen bg-gray-100 py-10 px-4">
            <div className="max-w-7xl mx-auto">
                <header className="mb-8 text-center">
                    <h1 className="text-3xl font-bold text-gray-800">Carrito de Compras</h1>
                    <p className="text-gray-600 mt-2">Revisa, actualiza o elimina tus productos antes de pagar</p>
                </header>
                <section className="w-full">
                    <CartComponent />
                </section>
            </div>
        </main>
    );
}