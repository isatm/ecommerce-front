"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { CreateSellerProfileFormValues } from "@/interfaces/seller";
import { supabase } from "@/libs/supabaseClient";
import { useRouter } from "next/navigation";
import { useAuth, User } from "@/contexts/authContext";

const createSellerProfileSchema = z.object({
  displayName: z
    .string()
    .min(3, "El nombre de tienda es requerido y debe tener al menos 3 caracteres."),
  city: z.string().min(2, "La ciudad es requerida."),
  acceptTerms: z.boolean().refine((val) => val === true, {
    message: "Debes aceptar los términos y condiciones.",
  }),
});

export const useCreateSellerProfile = () => {
  const router = useRouter();
  const { user, singIn } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<CreateSellerProfileFormValues>({
    resolver: zodResolver(createSellerProfileSchema),
    defaultValues: {
      displayName: user?.name || "",
      city: "",
      acceptTerms: false,
    },
  });

  const onSubmit = async (data: CreateSellerProfileFormValues) => {
    if (!user) {
      console.error("Usuario no autenticado.");
      alert("Debes iniciar sesión para crear un perfil de vendedor.");
      router.push("/signin");
      return;
    }

    try {
      const { data: updated, error: updateError } = await supabase
        .from("users")
        .update({
          role: "seller",
          name: data.displayName,
          city: data.city, 
        })
        .eq("email", user.email)
        .select()
        .maybeSingle();

      if (updateError) throw updateError;

      const updatedUser: User = {
        ...user,
        role: "seller",
        name: data.displayName,
        token: user.token,
      };

      singIn(updatedUser);

      console.log("Perfil de vendedor configurado:", updated);
      alert("¡Perfil de vendedor configurado exitosamente!");
      router.push("/dashboard/seller");
    } catch (error: any) {
      console.error("Error al configurar perfil de vendedor:", error?.message || error);
      setError("displayName", {
        type: "manual",
        message: "Error al guardar: " + (error?.message || "Error desconocido"),
      });
      alert("Error al configurar perfil de vendedor: " + (error?.message || "Error desconocido"));
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    onSubmit,
  };
};
