'use client';

import { userCartStore } from "@/store/cartStore";
import { useRouter } from "next/navigation";

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
            created_at: product.created_at,
        });
    
        router.push("/cart");
    };
    return { handleAddToCart}; 
}