'use client';


import { useRecord } from "@/hooks/useRecord";

export default function RecordComponent() {
    const { shops, loading, error } = useRecord();
    
    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Historial de Compras</h2>
            {/*después darrollamos la logica*/}
        </div>
    );
};