'use client'

import { useAuth } from "@/contexts/authContext";
import { FormValues } from "@/interfaces/shoppingInterfaces/formValues";
import { supabase } from "@/libs/supabaseClient";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { uuidv4 } from "zod";

export default function useSimpleProductForm() {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormValues>();
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const { user } = useAuth();

    const onSubmit = async (values: FormValues) => {
        setError(null);

        if (!user) {
            setError("Debes iniciar sesión para publicar un producto.");
            router.push("/signin");
            return;
        }

        try {
            const sellerId = user.id; // 👈 directo

            if (!sellerId) {
            throw new Error("No se encontró el ID del vendedor. Vuelve a iniciar sesión.");
            }

            // Subir imagen si hay
            let publicImageUrl: string | null = null;
            if (values.image?.length) {
            const file = values.image[0];
            const ext = file.name.split(".").pop();
            const filename = `${uuidv4()}.${ext}`;
            const filePath = `${sellerId}/${filename}`;

            const { error: uploadError } = await supabase.storage
                .from("product_images")
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            const { data: publicUrlData } = supabase.storage
                .from("product_images")
                .getPublicUrl(filePath);

            publicImageUrl = publicUrlData?.publicUrl ?? null;
            }

            // Insertar producto
            const {error: insertError } = await supabase
            .from("products")
            .insert({
                seller_id: sellerId,
                name: values.name,
                description: values.description,
                price: values.price,
                category: values.category,
                stock: values.stock,
                image_url: publicImageUrl,
            })
            .select()
            .single();

            if (insertError) throw insertError;

            alert("Producto creado exitosamente!");
            router.push("/dashboard/seller/listings");

        } catch (err) { 
            console.error("Error al crear producto:", err);
            setError(
                    err instanceof Error
                    ? err.message
                    : "Error desconocido al crear producto."
            );
        }
    }
    
    return {
        onSubmit,
        register,
        handleSubmit,
        errors,
        isSubmitting,
        error,
    };
}