
import React from "react";
import { Props } from "@/interfaces/shoppingInterfaces/propsItemInterface";
import { useProductItem } from "@/hooks/useProductItem";

export function ProductItem({ product }: Props) {
    const {  handleAddToCart } = useProductItem();

    return (
        <div className="border p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-bold">{product.name}</h2>
        <p>${product.price.toFixed(2)}</p>
        <button
            onClick={() => handleAddToCart(product)}
            className="bg-blue-500 text-white px-4 py-2 mt-2 rounded"
        >
            Añadir al carrito
        </button>
        </div>
    );
};

