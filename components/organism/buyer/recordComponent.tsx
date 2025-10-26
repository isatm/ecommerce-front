'use client';

import { useEffect, useState } from "react";

import { buyerService } from "@/libs/buyerService";
import { Shop } from "@/interfaces/shopInterface";


export default function RecordComponent() {
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

    if (loading) {
        console.log(shops);
        return <div>Cargando registros de compra...</div>;
    }
    if (error) {
        console.log(error);
        return <div>{error}</div>;
    } 
};