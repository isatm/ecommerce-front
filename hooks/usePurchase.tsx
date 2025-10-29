'use client';

import { LoginDTO } from "@/interfaces/loginInterfaces/loginInterface";
import { buyerService } from "@/libs/buyerService";
import { supabase } from "@/libs/supabaseClient";
import { loginScheme } from "@/schemas/loginSchema";
import { userCartStore } from "@/store/cartStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export function usePurchase(){
        const { getTotal, products } = userCartStore();
        const [loading, setLoading] = useState(false);
        const [isClient, setIsClient] = useState(false);
        const [user, setUser] = useState();
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
            const { data: { session } } = await supabase.auth.getSession();
            
            if (!session) {
                alert("Debes iniciar sesión para realizar una compra");
                return;
            }
    
            if (products.length === 0) {
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
                email: formData.email
                }
            );
    
            console.log("Compra creada:", purchase);
            alert("¡Compra realizada exitosamente!");
    
            } catch (error) {
            console.error("Error en la compra:", error);
            alert(onmessage || "Error al procesar la compra");
            } finally {
            setLoading(false);
            }
        };

        return {
            handleFormSubmit,
            setFormData,
            handleSubmit,
            setIsClient,
            formData,
            errors,
            loading,
            products,
            getTotal,
            register
        }
}