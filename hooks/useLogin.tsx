'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";

import { LoginDTO } from "@/interfaces/loginInterfaces/loginInterface";
import { loginService } from "@/libs/loginService";
import { loginScheme } from "@/schemas/loginSchema";
import { useAuth } from "@/contexts/authContext";

import { supabase } from "@/libs/supabaseClient"; 

export function useLogin() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginDTO>({
    resolver: zodResolver(loginScheme),
  });

  const { singIn } = useAuth();

  const onSubmit: SubmitHandler<LoginDTO> = async (data) => {
    try {
      const loginData = await loginService(data);

      if (loginData.session && loginData.user) {
        const email = loginData.user.email;

        
        const { data: userRow, error: userError } = await supabase
          .from("users")
          .select("id, role, name, lastname")
          .eq("email", email)
          .maybeSingle();

        if (userError) {
          console.error("Error buscando usuario en tabla 'users':", userError);
          alert("Error interno al obtener usuario.");
          return;
        }

        if (!userRow) {
          alert("No se encontró el usuario en la base de datos.");
          return;
        }

        // construir objeto de usuario con el ID incluido
        const userData = {
          id: userRow.id, // 👈 nuevo campo
          name: userRow.name || loginData.user.user_metadata.name || "",
          lastname: userRow.lastname || loginData.user.user_metadata.lastname || "",
          role: userRow.role || loginData.user.user_metadata.role || "buyer",
          token: loginData.session.access_token,
          email: email || "",
        };

        // guardar en cookies/context
        singIn(userData);

        alert("✅ Login correcto");
        router.refresh();
        router.push("/dashboard");
      } else {
        alert("Error: No se pudo obtener la sesión o los datos del usuario.");
      }
    } catch (err: any) {
      console.error("Error en login:", err);
      alert("Usuario o contraseña incorrectos");
    }
  };

  const onErrors = () => {
    console.log("Errores", errors);
    alert("Información incompleta");
  };

  return {
    handleSubmit,
    register,
    onSubmit,
    onErrors,
  };
}

export default useLogin;
