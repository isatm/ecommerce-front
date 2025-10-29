'use client';

import { useEffect, useState } from "react";
import { userCartStore } from "@/store/cartStore";
import InputComponent from "@/components/atoms/inputComponent";
import { useRegister } from "@/hooks/useRegister";
import { supabase } from "@/libs/supabaseClient";
import { useForm } from "react-hook-form";
import { LoginDTO } from "@/interfaces/loginInterfaces/loginInterface";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginScheme } from "@/schemas/loginSchema";


export default function PurchaseComponent() {
    const { getTotal, products } = userCartStore();
    const [loading, setLoading] = useState(false);
    const [isClient, setIsClient] = useState(false);
    const {
            register,
            handleSubmit,
            formState: { errors },
        } = useForm<LoginDTO>({
            resolver: zodResolver(loginScheme),
        });

    const [formData, setFormData] = useState({
        email: "",
        address: "",
        phone: "",
        fullName: ""
    });

    useEffect(() => {
        setIsClient(true);
    }, []);

    const handleFormSubmit = async () => {
        setLoading(true);
        try {
            
            // cambiar por los nombres de las tablas
            const { data: userData, error: userError } = await supabase
                .from("users")
                .select("id, email, name, lastname")
                .eq("email", formData.email)
                .maybeSingle();

            if (userError) {
                console.error("Error buscando usuario:", userError);
                alert("Error al verificar usuario");
                return;
            }

            // Crear objeto de compra
            const purchaseData = {
                user_id: userData?.id || `guest_${Date.now()}`,
                user_email: formData.email,
                user_name: formData.fullName,
                user_phone: formData.phone,
                total: getTotal(),
                state: 'pendiente' as const,
                address: formData.address,
                date: new Date().toISOString().split('T')[0],
                products: products,
                created_at: new Date().toISOString()
            };

            // Guardar la compra en Supabase
            const { data: purchase, error: purchaseError } = await supabase
                .from("shop") 
                .insert([purchaseData])
                .select();

            if (purchaseError) {
                console.error("Error guardando compra:", purchaseError);
                alert("Error al procesar la compra");
                return;
            }

            console.log("Compra guardada:", purchase);
            alert("¡Compra realizada exitosamente!");
            

        } catch (error) {
            console.error("Error en la compra:", error);
            alert("Error al procesar la compra");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div className="max-w-2xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-8 text-center">Finalizar Compra</h1>
            
            <form onSubmit={handleSubmit(handleFormSubmit)} className="w-full space-y-6 bg-white p-8 rounded-lg shadow-md">
                
                {/* Información de contacto */}
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold border-b pb-2">Información de Contacto</h2>
                    
                    <div>
                        <label htmlFor="email" className="font-semibold text-sm block mb-2">
                            Email *
                        </label>
                        <InputComponent
                            label=""
                            typeElement="email"
                            idElement="email"
                            name="email"
                            register={register}
                            className="border-gray-300 focus:border-orange-500 rounded-md"
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                        )}
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

                {/* Dirección de envío */}
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

                {/* Resumen de la compra */}
                <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                    <h2 className="text-xl font-semibold border-b pb-2">Resumen de la Compra</h2>
                    
                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <span className="font-medium">Total:</span>
                            <span className="font-bold">${getTotal().toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-medium">Estado:</span>
                            <span className="font-semibold text-orange-500 capitalize">pendiente</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-medium">Fecha:</span>
                            <span className="font-medium">{new Date().toLocaleDateString()}</span>
                        </div>
                    </div>

                    {/* Productos en el carrito */}
                    <div className="mt-4">
                        <h3 className="font-semibold mb-2">Productos:</h3>
                        <div className="space-y-2 max-h-40 overflow-y-auto">
                            {products.map((product) => (
                                <div key={product.id} className="flex justify-between text-sm border-b pb-2">
                                    <span className="truncate max-w-[200px]">{product.name}</span>
                                    <span>${product.price} x {product.quantity}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Botón de envío */}
                <div className="pt-4">
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 font-semibold text-lg transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed"
                    >
                        {loading ? "Procesando..." : `Confirmar Compra - $${getTotal().toFixed(2)}`}
                    </button>
                </div>


                <p className="text-xs text-gray-500 text-center">
                    Al confirmar la compra, aceptas nuestros términos y condiciones.
                </p>
            </form>
        </div>
    );
}