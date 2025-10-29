'use client';

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { userCartStore } from "@/store/cartStore";
import { useAuth } from "@/contexts/authContext";
import { zodResolver } from "@hookform/resolvers/zod";

import { LoginDTO } from "@/interfaces/loginInterfaces/loginInterface";
import { buyerService } from "@/libs/services/buyerService";
import { loginScheme } from "@/schemas/loginSchema";

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
        gmail: "",
        address: "",
        phone: "",
        fullName: ""
    });

    const handleFormSubmit = async () => {
        console.log('1. handleFormSubmit EJECUTADO');
        console.log('User:', user);
        console.log('Products:', products);
        console.log('FormData:', formData);

        setLoading(true);
        try {
            if (!user) {
                console.log('Usuario no autenticado, redirigiendo a login...');
                alert("Debe iniciar sesión para completar la compra");
                router.push("/signin");
                return;
            }

            if (products.length === 0) {
                console.log('ERROR: Carrito vacío');
                alert("El carrito está vacío");
                return;
            }

            if (!formData.address.trim() || !formData.fullName.trim() || !formData.phone.trim() || !formData.gmail.trim()) {
                console.log('ERROR: Campos incompletos');
                alert("Por favor completa todos los campos requeridos");
                return;
            }

            console.log('Procesando compra para usuario:', user.id);

            const purchase = await buyerService.createPurchase(
                products, 
                formData.address,
                {
                    fullName: formData.fullName,
                    phone: formData.phone,
                    gmail: formData.gmail,
                },
                user.id
            );

            console.log("Compra creada:", purchase);
            alert("¡Compra realizada exitosamente!");

            clearCart();
            router.push("/dashboard/buyer/details");

        } catch (error: any) {
            console.error(" Error en la compra:", error);
            alert(error.message || "Error al procesar la compra"); 
        } finally {
            setLoading(false);
        }
    };

    const updateFormData = (newData: Partial<typeof formData>) => {
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
        isClient,
        isAuthenticated: !!user,
        user
    };
}