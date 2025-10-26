'use client'

import { registerService } from "@/libs/registerService";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterScheme, RegisterFormValues } from "@/schemas/register";

export function useRegister() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(RegisterScheme),
    defaultValues: {
      name: "",
      lastname: "",
      email: "",
      confirmEmail: "",
      password: ""
    }
  });

  const onSubmit: SubmitHandler<RegisterFormValues> = async (data) => {
    try {
      const { confirmEmail, ...payload } = data;
      await registerService(payload);
      router.push("/signin");
    } catch (err: any) {
      console.error("Error en registro:", err);
      alert(err?.message || "Error al registrarse.");
    }
  };

  const onErrors = (formErrors: any) => {
    console.log("Errores detectados:", formErrors);
    alert("Información incompleta o inválida. Revisa los campos marcados.");
  };

  return { onSubmit, onErrors, register, handleSubmit, errors, setError };
}