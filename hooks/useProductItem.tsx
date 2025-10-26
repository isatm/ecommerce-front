'use client';

import { userCartStore } from "@/hooks/usecartStore";
import { useRouter } from "next/router";

export function useProductItem() {
    const addProduct = userCartStore((state) => state.addProduct); 
    const router = useRouter(); 
    
    const handleAddToCart = (product: any) => {
        addProduct({
            id: product.id,
            name: product.name,
            description: product.description,
            price: product.price,
            category: product.category,
            stock: product.stock,
            image_url: product.image_url,
        });
    
        router.push("/cart");
    };
    return { handleAddToCart}; 
}