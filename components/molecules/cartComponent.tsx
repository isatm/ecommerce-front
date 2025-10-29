"use client";

import { userCartStore } from "@/store/cartStore";
import Image from "next/image";
import Link from "next/link";
import Button from "../atoms/buttonComponent";
import { useEffect, useState } from "react"; 
import { getUserNameById } from "@/libs/services/productService"; 

export default function CartComponent() {
  const { products, removeProduct, updateQuantity, getTotal } = userCartStore();

  const [sellerNames, setSellerNames] = useState<{ [key: number]: string }>({});
  const [loadingSellerNames, setLoadingSellerNames] = useState(true);

  useEffect(() => {
    const loadSellerNames = async () => {
      const uniqueSellerIds = Array.from(
        new Set(products.map(p => p.seller_id).filter(id => id !== undefined))
      ) as number[]; 

      const namesMap: { [key: number]: string } = {};
      await Promise.all(
        uniqueSellerIds.map(async (id) => {
          const name = await getUserNameById(id);
          namesMap[id] = name || "Nombre del Vendedor"; 
        })
      );
      setSellerNames(namesMap);
      setLoadingSellerNames(false);
    };

    if (products.length > 0) {
      loadSellerNames();
    } else {
      setLoadingSellerNames(false); 
    }
  }, [products]);

  if (products.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-sm">
        <h1 className="text-2xl font-bold mb-6">Carrito de compras</h1>
        
        <div className="text-center py-16 border-2 border-dashed border-gray-200 rounded-lg">
          <div className="mb-6">
            <svg 
              className="w-20 h-20 text-gray-400 mx-auto" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={1.5} 
                d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5.5M7 13l2.5 5.5m5.5-5.5h5.5m-5.5 0V19a2 2 0 104 0v-1.5m-4-4.5V19a2 2 0 11-4 0v-6.5" 
              />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold mb-4">Tu carrito está vacío</h2>
          <p className="text-gray-600 mb-8 max-w-md mx-auto text-lg">
            ¡Comienza a navegar y encuentra el equipo musical perfecto para ti!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/categories">
              <Button variant="dark" className="px-8 py-3 text-base">
                Ver categorías
              </Button>
            </Link>
            <Link href="/deals">
              <Button variant="primary" className="px-8 py-3 text-base">
                Ver ofertas destacadas
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const subtotal = getTotal();
  const shipping = 0;
  const taxes = 0;
  const total = subtotal + shipping + taxes;

  return (
    <div className="w-full">
      {/* Header con cantidad de productos */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          {products.length} {products.length === 1 ? 'producto' : 'productos'} en tu carrito
        </h1>
      </div>

      <div className="flex flex-col xl:flex-row gap-8">
        {/* Columna izquierda - Lista de productos - Más ancha */}
        <div className="xl:w-7/12">
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
            {products.map((product) => (
              <div key={product.id} className="p-8 border-b border-gray-200 last:border-b-0">
                <div className="flex gap-6">
                  {/* Imagen del producto más grande */}
                  <div className="relative w-32 h-32 flex-shrink-0">
                    <Image
                      src={product.image_url || "/fallback.png"}
                      alt={product.name}
                      fill
                      className="rounded-lg object-cover border border-gray-200"
                    />
                  </div>

                  {/* Información del producto - Más espacio */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-xl text-gray-900 hover:text-orange-500 transition-colors mb-3">
                      <Link href={`/products/${product.id}`}>
                        {product.name}
                      </Link>
                    </h3>
                    
                    {/* Vendedor */}
                    <div className="text-base text-gray-600 mb-3">
                      <span className="font-medium">VENDIDO POR</span><br />
                      {loadingSellerNames ? (
                        <span className="font-semibold text-gray-400">Cargando...</span>
                      ) : (
                        <span className="font-semibold text-gray-900">
                          {product.seller_id ? sellerNames[product.seller_id] : "Nombre del Vendedor"}
                        </span>
                      )}
                    </div>

                    {/* Ubicación */}
                    <div className="text-base text-gray-600 mb-6">
                      Ciudad, País {/* Placeholder */}
                    </div>

                    {/* Precio y controles */}
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                      <div className="flex items-center gap-6">
                        <span className="text-2xl font-bold text-gray-900">
                          ${product.price.toLocaleString()}
                        </span>
                        
                        {/* Controles de cantidad más grandes */}
                        <div className="flex items-center gap-3">
                          <span className="text-base text-gray-600">Cantidad:</span>
                          <div className="flex items-center border border-gray-300 rounded-lg">
                            <button
                              onClick={() => updateQuantity(product.id, product.quantity - 1)}
                              className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 transition-colors text-lg"
                            >
                              -
                            </button>
                            <span className="w-16 text-center font-medium text-lg">
                              {product.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(product.id, product.quantity + 1)}
                              className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 transition-colors text-lg"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Eliminar */}
                      <button
                        onClick={() => removeProduct(product.id)}
                        className="text-red-500 hover:text-red-700 text-base font-medium transition-colors self-start lg:self-center px-4 py-2 border border-red-200 rounded-lg hover:bg-red-50"
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="xl:w-5/12">
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm sticky top-8">
            <div className="p-8">
              <h3 className="text-xl font-bold mb-6">Resumen de la orden</h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-base">
                  <span className="text-gray-600">Total del producto</span>
                  <span className="font-semibold">US${subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-base">
                  <span className="text-gray-600">Total del envío</span>
                  <span className="font-semibold">US${shipping.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-base">
                  <span className="text-gray-600">Impuestos estimados</span>
                  <span className="font-semibold">US${taxes.toLocaleString()}</span>
                </div>
              </div>

              <div className="border-t border-gray-200 my-6"></div>

              <div className="flex justify-between text-xl font-bold mb-8">
                <span>Subtotal</span>
                <span>US${total.toLocaleString()}</span>
              </div>

              <Link href="/purchase" className="block w-full mb-6">
                <Button variant="dark" className="w-full py-4 text-xl font-semibold">
                  Proceder al pago
                </Button>
              </Link>

              <div className="text-center text-base text-gray-600 border-t border-gray-200 pt-6">
                <div className="font-semibold mb-3">Reverb Gives</div>
                <p className="text-sm leading-relaxed">
                  Tus compras permiten que algunos programas de música juveniles 
                  obtengan el equipo que necesitan para hacer su música.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}