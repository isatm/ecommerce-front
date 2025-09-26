"use client";

import { userCartStore } from "@/store/cartStore";
import Image from "next/image";

export default function Cart() {
  const { products, removeProduct, updateQuantity, getTotal } = userCartStore();

  if (products.length === 0) {
    return (
      <div className="p-6 bg-white rounded-xl shadow-md text-center">
        <h2 className="text-xl font-semibold">Tu carrito</h2>
        <p className="text-gray-500 mt-2">El carrito está vacío 🛒</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-xl shadow-md space-y-6">
      <h2 className="text-xl font-semibold">Tu carrito</h2>

      <ul className="space-y-4">
        {products.map((product) => (
          <li
            key={product.id}
            className="flex items-center gap-4 border-b pb-4 last:border-none"
          >
            {/* Imagen del producto */}
            <div className="relative w-20 h-20 flex-shrink-0">
              <Image
                src={product.image_url || "/fallback.png"}
                alt={product.name}
                fill
                className="rounded-lg object-cover"
              />
            </div>

            {/* Info producto */}
            <div className="flex-1">
              <h3 className="font-medium">{product.name}</h3>
              <p className="text-sm text-gray-500">
                ${product.price} x {product.quantity} ={" "}
                <span className="font-semibold">
                  ${product.price * product.quantity}
                </span>
              </p>
            </div>

            {/* Controles */}
            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  updateQuantity(product.id, product.quantity - 1)
                }
                className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
              >
                -
              </button>
              <span className="px-2">{product.quantity}</span>
              <button
                onClick={() =>
                  updateQuantity(product.id, product.quantity + 1)
                }
                className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
              >
                +
              </button>
              <button
                onClick={() => removeProduct(product.id)}
                className="ml-3 px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Total */}
      <div className="pt-4 border-t flex justify-between items-center">
        <p className="text-lg font-bold">Total: ${getTotal()}</p>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Finalizar compra
        </button>
      </div>
    </div>
  );
}
