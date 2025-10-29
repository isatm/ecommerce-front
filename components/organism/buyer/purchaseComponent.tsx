'use client';

import { usePurchase } from "@/hooks/usePurchase";

import { useEffect, useState } from "react";

export default function PurchaseComponent() {
    const { setFormData, handleFormSubmit, handleSubmit, formData, errors, getTotal, loading, products, register} = usePurchase();
    const [isClient, setIsClient] = useState(false);
    
    useEffect(() => {
        setIsClient(true);
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({
            [name]: value
        }); 
    };

    const handleInputChange = (field: keyof typeof formData, value: string) => {
        setFormData({
            [field]: value
        });
    };

    return (
        <div className="max-w-2xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-8 text-center">Finalizar Compra</h1>
            
            <div className="w-full space-y-6 bg-white p-8 rounded-lg shadow-md">

                <div className="space-y-4">
                    <h2 className="text-xl font-semibold border-b pb-2">Información de Contacto</h2>
                    
                <div>
                    <label htmlFor="gmail" className="font-semibold text-sm block mb-2">
                    Email *
                    </label>
                    <input
                        type="email"  
                        id="gmail"
                        name="gmail"
                        value={formData.gmail}  
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="tucorreo@gmail.com" 
                    />
                </div>

                    <div>
                        <label htmlFor="fullName" className="font-semibold text-sm block mb-2">
                            Nombre Completo *
                        </label>
                        <input
                            type="text"
                            id="fullName"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Juan Pérez"
                        />
                    </div>

                    <div>
                        <label htmlFor="phone" className="font-semibold text-sm block mb-2">
                            Teléfono *
                        </label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="+57 300 123 4567"
                        />
                    </div>
                </div>

                <div className="space-y-4">
                    <h2 className="text-xl font-semibold border-b pb-2">Dirección de Envío</h2>
                    
                    <div>
                        <label htmlFor="address" className="font-semibold text-sm block mb-2">
                            Dirección Completa *
                        </label>
                        <textarea
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            required
                            rows={3}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Calle, número, ciudad, departamento"
                        />
                    </div>
                </div>


                <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                    <h2 className="text-xl font-semibold border-b pb-2">Resumen de la Compra</h2>
                    
                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <span className="font-medium">Total:</span>
                            <span className="font-bold">

                                {isClient ? `$${getTotal().toFixed(2)}` : '$0.00'}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-medium">Estado:</span>
                            <span className="font-semibold text-orange-500 capitalize">pendiente</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-medium">Fecha:</span>
                            <span className="font-medium">

                                {isClient ? new Date().toLocaleDateString() : 'Cargando...'}
                            </span>
                        </div>
                    </div>

                    <div className="mt-4">
                        <h3 className="font-semibold mb-2">Productos:</h3>
                        <div className="space-y-2 max-h-40 overflow-y-auto">

                            {isClient ? (
                                products.length > 0 ? (
                                    products.map((product) => (
                                        <div key={product.id} className="flex justify-between text-sm border-b pb-2">
                                            <span className="truncate max-w-[200px]">{product.name}</span>
                                            <span>${product.price} x {product.quantity}</span>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-gray-500 text-sm">No hay productos en el carrito</p>
                                )
                            ) : (
                                <div className="animate-pulse">
                                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="pt-4">
                    <button
                        type="button" 
                        onClick={() => {
                            console.log('BOTÓN CLICKEADO - Iniciando compra...');
                            console.log('Productos:', products);
                            console.log(' Usuario en formData:', formData);
                            console.log('Total calculado:', getTotal());
                            
                            handleFormSubmit();
                        }}

                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 font-semibold text-lg transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed"
                    >

                        {!isClient ? (
                            "Cargando..."
                        ) : loading ? (
                            "Procesando..."
                        ) : (
                            `Confirmar Compra - $${getTotal().toFixed(2)}`
                        )}
                    </button>
                </div>

                <div className="text-center space-y-2">
                    <p className="text-xs text-gray-500">
                        Al confirmar la compra, aceptas nuestros términos y condiciones.
                    </p>

                    {process.env.NODE_ENV === 'development' && isClient && (
                        <div className="text-xs text-green-600 bg-green-50 p-2 rounded border">
                            <strong>DEBUG:</strong> Productos: {products.length} | 
                            Total: ${getTotal().toFixed(2)} | 
                            Cliente: {isClient ? 'Sí' : 'No'}
                        </div>
                    )}
                </div>
            </div> 
        </div>
    );
}