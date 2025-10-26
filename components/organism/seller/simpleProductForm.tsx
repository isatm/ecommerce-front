"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { supabase } from "@/libs/supabaseClient";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/authContext";
import { v4 as uuidv4 } from "uuid";

type FormValues = {
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  image?: FileList;
};

export default function SimpleProductForm() {
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
        const { data, error: insertError } = await supabase
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
    } catch (err: any) {
        console.error("Error al crear producto:", err);
        setError(err?.message ?? "Error desconocido al crear producto.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-xl font-semibold mb-4">Crear producto</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Nombre</label>
          <input {...register("name", { required: "Obligatorio" })} className="w-full border p-2 rounded" />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium">Descripción</label>
          <textarea {...register("description", { required: "Obligatorio" })} className="w-full border p-2 rounded" rows={4} />
          {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
        </div>

        <div className="grid grid-cols-3 gap-2">
          <div>
            <label className="block text-sm font-medium">Precio</label>
            <input type="number" step="0.01" {...register("price", { valueAsNumber: true, required: "Obligatorio" })} className="w-full border p-2 rounded" />
            {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium">Stock</label>
            <input type="number" {...register("stock", { valueAsNumber: true, required: "Obligatorio" })} className="w-full border p-2 rounded" />
            {errors.stock && <p className="text-red-500 text-sm">{errors.stock.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium">Categoría</label>
            <input {...register("category", { required: "Obligatorio" })} className="w-full border p-2 rounded" />
            {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium">Imagen principal (opcional)</label>
          <input type="file" accept="image/*" {...register("image")} className="w-full" />
        </div>

        {error && <p className="text-red-600">{error}</p>}

        <div className="flex justify-end">
          <button type="submit" disabled={isSubmitting} className="bg-orange-500 text-white px-4 py-2 rounded">
            {isSubmitting ? "Subiendo..." : "Crear producto"}
          </button>
        </div>
      </form>
    </div>
  );
}
