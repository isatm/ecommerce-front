'use client';

import { Shop } from "@/interfaces/shoppingInterfaces/shopInterface";
import { buyerService } from "@/libs/buyerService";
import { useEffect, useState } from "react";

export function useRecord(){
    const [shops, setShops] = useState<Shop[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchShops = async () => {
            try {   
                const data = await buyerService.getUserPurchases();
                setShops(data);
            } catch (err) {
                setError("Error al cargar los registros de compra.");
            }
            setLoading(false);
        };

        fetchShops();
    }, []);

    return {
        shops,
        loading, 
        error
    };
}