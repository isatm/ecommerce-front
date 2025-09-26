import CartComponent from "@/components/molecules/cartComponent";

export default function CartPage() {
    return (
        <main className="min-h-screen bg-gray-100 flex flex-col items-center justify-start py-10 px-4">

        <header className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-800"> Carrito de Compras</h1>
            <p className="text-gray-600">Revisa, actualiza o elimina tus productos antes de pagar</p>
        </header>

        <section className="w-full max-w-2xl">
            <CartComponent />
        </section>

        <footer>
        </footer>
        </main>
    );
}
