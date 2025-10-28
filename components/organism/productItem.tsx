"use client";
import Image from "next/image";
import { userCartStore } from "@/hooks/usecartStore"; 
import EmerPageButton from "../atoms/buttons/emerPageButtonComponent";
import ToggleButtonComponent from "../atoms/buttons/toggleButtonComponent";
import { Product } from "@/interfaces/product";
import { useProductItem } from "@/hooks/useProductItem";

export default function ProductItem({ product }: { product: Product }) {

  const { handleAddToCart } = useProductItem();

  return (
    <div className="flex flex-col md:flex-row gap-6 p-6 bg-white rounded-lg shadow-md">
      {/* Imagen del producto */}
      {product.image_url && (
        <div className="w-full md:w-1/2 relative">
          <Image
            src={product.image_url}
            alt={product.name}
            width={500}
            height={500}
            className="rounded-lg object-cover"
          />
        </div>
      )}

      {/* Info del producto */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <p className="text-gray-600">{product.description}</p>
          <p className="mt-2 text-sm text-gray-500">Categoría: {product.category}</p>
          <p className="mt-2 text-lg font-semibold text-green-700">
            ${product.price}
          </p>
          <p className="mt-1 text-gray-500">Stock disponible: {product.stock}</p>
        </div>

        {/* Botones */}
        <div className="mt-4 flex gap-3">
          <button
            onClick={handleAddToCart} 
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-medium"
          >
            Agregar al carrito
          </button>

          <EmerPageButton buttonLabel="Ver más">
            <div>
              <h2 className="text-lg font-bold">Detalles extra</h2>
              <p>Aquí puedes meter más información del producto.</p>
            </div>
          </EmerPageButton>

          <ToggleButtonComponent
            options={["Compartir", "Guardar", "Reportar"]}
            buttonStyle="bg-gray-200 px-4 py-2 rounded-lg"
            content="Más opciones"
            animation="fade"
          />
        </div>
      </div>
    </div>
  );
}
