import React from "react";
import { userCartStore } from "@/store/cartStore";
import { Props } from "@/interfaces/propsItem";

    const ProductItem: React.FC<Props> = ({ product }) => {
    const addToCart = userCartStore((state) => state.addProduct);

    return (
        <div className="border p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-bold">{product.name}</h2>
        <p>${product.price.toFixed(2)}</p>
        <button
            onClick={() => addToCart(product)}
            className="bg-blue-500 text-white px-4 py-2 mt-2 rounded"
        >
            Añadir al carrito
        </button>
        </div>
    );
};

export default ProductItem;