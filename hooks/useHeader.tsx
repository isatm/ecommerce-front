'use client';

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import { Product } from '@/interfaces/shoppingInterfaces/productInterface'
import { searchProductSuggestions } from "@/libs/services/productService"; // Usa la nueva función de sugerencias
import { SearchForm } from '@/interfaces/searchInterfaces/searchInterface';

export function useHeaderComponent() {
    const { register, handleSubmit, watch } = useForm<SearchForm>();
    const router = useRouter();
    const [results, setResults] = useState<Partial<Product>[]>([]);
    const searchTerm = watch("search");

    const handleSearchSuggestions = async (term: string) => {
        if (term.length < 2) {
            setResults([]);
            return;
        }
        try {
            const products = await searchProductSuggestions(term);  
            setResults(products);
        } catch (err: unknown) {
            console.error("Error al buscar sugerencias de productos:", err);
            setResults([]);
        }
    };

    useEffect(() => {
        if (searchTerm) {
            handleSearchSuggestions(searchTerm); 
        } else {
            setResults([]);
        }
    }, [searchTerm]);

    const onSubmit = () => {
        if (searchTerm) {
            router.push(`/marketplace?query=${encodeURIComponent(searchTerm)}`);
        } else {
            alert("Por favor, ingresa un término de búsqueda.");
        }
    };

    const navigateToProductDetail = (productId: number) => {
        router.push(`/products/${productId}`);
    };

    return{
        register,
        handleSubmit,
        results,
        onSubmit,
        router,
        navigateToProductDetail
    }
}