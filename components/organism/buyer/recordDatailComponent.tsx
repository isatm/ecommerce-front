' use client ';

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
        return <div>Cargando registros de compra...</div>;
    }
    if (error) {
        return <div>{error}</div>;
    }
    return (
        <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Historial de Compras</h2>   
            {shops.length === 0 ? (
                <p>No tienes registros de compra.</p>
            ) : (
                <ul>        
                    {shops.map((shop, index) => (
                        <li key={index} className="border-b border-gray-200 py-4">
                            <p><span className="font-semibold">ID de Compra:</span> {shop.user_id}</p>
                            <p><span className="font-semibold">Total:</span> ${shop.total.toFixed(2)}</p>
                            <p><span className="font-semibold">Estado:</span> {shop.state}</p>
                            <p><span className="font-semibold">Dirección:</span> {shop.adress}</p>
                            <p><span className="font-semibold">Fecha:</span> {shop.date}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}