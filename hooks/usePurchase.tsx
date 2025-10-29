'use client';

import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { LoginDTO } from "@/interfaces/loginInterfaces/loginInterface";
import { buyerService } from "@/libs/services/buyerService";
import { supabase } from "@/libs/supabaseClient";
import { userCartStore } from "@/store/cartStore";
import { loginScheme } from "@/schemas/loginSchema";
import { useAuth } from "@/contexts/authContext";

export function usePurchase() {
    const router = useRouter();
    const { user, loading: authLoading } = useAuth();
    const { getTotal, products, clearCart } = userCartStore();
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

    const handleFormSubmit = async () => {
        console.log('🔵 1. handleFormSubmit EJECUTADO');
        console.log('👤 User:', user);
        console.log('📦 Products:', products);
        console.log('📝 FormData:', formData);
        console.log('🛒 Total productos:', products.length);

        setLoading(true);
        try {

            if(!user) {
                console.log('❌ 3. ERROR: No hay usuario');
                alert("Debe iniciar sesión para comprar");
                return;
            }

            if (products.length === 0) {
                console.log('❌ 5. ERROR: Carrito vacío');
                alert("El carrito está vacío");
                return;
            }

            if (!formData.address.trim() || !formData.fullName.trim() || !formData.phone.trim()) {
                alert("Por favor completa todos los campos requeridos");
                return;
            }

            const purchase = await buyerService.createPurchase(
                products, 
                formData.address,
                {
                    fullName: formData.fullName,
                    phone: formData.phone,
                    email: formData.email,
                },
                user.id
            );

            console.log("Compra creada:", purchase);
            alert("¡Compra realizada exitosamente!");

            clearCart();

            router.push("/dashboard/details");

        } catch (error: any) {
            console.error("Error en la compra:", error);
            alert(error.message || "Error al procesar la compra"); 
        } finally {
            setLoading(false);
        }
    };

    const updateFormData = (newData: Partial<FormData>) => {
        setFormData(prev => ({ 
            ...prev, 
            ...newData 
        }));
    };


    return {
        handleFormSubmit,
        setFormData: updateFormData,
        handleSubmit,
        setIsClient,
        formData,
        errors,
        loading: loading || authLoading,
        products,
        getTotal,
        register,
        isClient
    };
}