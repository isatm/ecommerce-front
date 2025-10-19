"use client"
import { Product} from '@/interfaces/product'
import { searchProducts } from "@/libs/productService";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";


interface SearchForm {
  search: string;
}
export function useHeaderComponent() {
    const { register, handleSubmit, watch } = useForm<SearchForm>();
    const router = useRouter();
    const [results, setResults] = useState<Partial<Product>[]>([]);
    const searchTerm = watch("search");

    const handleSearch = async (term: string) => {
        if (term.length < 2) {
        setResults([]);
        return;
        }
        try {
        const products = await searchProducts(term);  
            
        const productsWithPrice = products.map(product => ({
            ...product, // es un precio estatico por el momento, que le es asignado de forma predeterminada
            price: 0
        }));
        
        setResults(productsWithPrice);
        } catch (err: unknown) {
        console.error("Error al buscar productos:", err);
        setResults([]);
        }
    };

    useEffect(() => {
        if (searchTerm) {
        handleSearch(searchTerm);
        } else {
        setResults([]);
        }
    }, [searchTerm]);

    const onSubmit = () => {
        if (results.length > 0) {
        router.push(`/products/${results[0].id}`);
        } else {
        alert("No se encontraron productos");
        }
    };
    return{
        register,
        handleSubmit,
        results,
        onSubmit,
        router
    }
}