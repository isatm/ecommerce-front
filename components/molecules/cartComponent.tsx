"use client";

import { userCartStore } from "@/store/cartStore"; // 👈 ajusta la ruta
import ButtonComponent from "@/components/atoms/buttonComponent";

export default function CartComponent() {
    const { products, removeProduct, updateQuantity, getTotal } = userCartStore();

    return (
        <div className="space-y-4 p-6 max-w-md mx-auto bg-white rounded-lg shadow">
        <h2 className="text-xl font-bold text-center">Tu Carrito</h2>

        {/* Lista de productos */}
        {products.length === 0 ? (
            <p className="text-center text-gray-500">El carrito está vacío</p>
        ) : (
            products.map((p) => (
            <div
                key={p.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-md shadow-sm"
            >
                <div>
                <p className="font-semibold">{p.name}</p>
                <p className="text-sm text-gray-600">
                    ${p.price} x {p.quantity} = ${p.price * p.quantity}
                </p>
                </div>

                <div className="flex gap-2">
                <button
                    className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                    onClick={() => updateQuantity(p.id, p.quantity - 1)}
                >
                    -
                </button>
                <button
                    className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                    onClick={() => updateQuantity(p.id, p.quantity + 1)}
                >
                    +
                </button>
                <button
                    className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    onClick={() => removeProduct(p.id)}
                >
                    
                </button>
                </div>
            </div>
            ))
        )}

        {/* Total */}
        <div className="text-center font-bold text-lg">
            Total: ${getTotal()}
        </div>

        {products.length > 0 && (
            <ButtonComponent type={3} content="Proceder al pago" />
        )}
        </div>
    );
}
