' use client ';

import { useRecord } from "@/hooks/useRecord";

export default function RecordComponent() {
    const { shops, loading, error } = useRecord(); // después desarrolamos la logica
    
    return (
        <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Historial de Compras</h2>   
            {shops.length === 0 ? (
                <p>No tienes registros de compra.</p>
            ) : (
                <ul>        
                    {shops.map((shop, index) => (
                        <li key={index} className="border-b border-gray-200 py-4">
                            <p><span className="font-semibold">Compra:</span> {shop.gmail}</p>
                            <p><span className="font-semibold">Total:</span> ${shop.total.toFixed(2)}</p>
                            <p><span className="font-semibold">Estado:</span> {shop.state}</p>
                            <p><span className="font-semibold">Dirección:</span> {shop.adress}</p>
                            <p><span className="font-semibold">Fecha:</span> {shop.date}</p>
                            <p><span className="font-semibold"> products:</span> {JSON.stringify(shop.products)}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};
