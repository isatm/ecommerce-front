'use client';

import Image from "next/image";

import { Product } from "@/interfaces/shoppingInterfaces/productInterface";

export default function ProductCard({
    name,
    description,
    category,
    price,
    stock,
    image_url,
  }: Product) {
    
  return (
    <div className="rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
      <div className="relative w-full h-52">
        <Image
          src={image_url || "/fallback.png"}
          alt={name || "Imagen de producto"}
          fill
          className="object-cover"
        />
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="text-sm text-gray-500">{description}</p>
        <p className="text-xs mt-1 text-gray-400">Categoría: {category}</p>

        <div className="flex justify-between items-center mt-3">
          <span className="text-lg font-bold">${price}</span>
          <span className="text-xs text-gray-500">Stock: {stock}</span>
        </div>
      </div>
    </div>
  );
}
