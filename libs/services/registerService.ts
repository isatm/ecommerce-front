import { RegisterDTO } from "@/interfaces/registerInterfaces/registerInterface";
import { supabase } from "@/libs/supabaseClient";

export const registerService = async (body: RegisterDTO) => {
  const { name, lastname, email, password } = body;

  const { data: registerData, error } = await supabase.auth.signUp({
    email: email.trim().toLowerCase(),
    password,
    options: {
      data: {
        name,
        lastname,
        role: "buyer", 
      },
    },
  });

  if (error) {
    console.error("Error al registrarse:", error.message);
    throw error;
  }

  const user = registerData.user;

  // Registrar en la tabla pública
  if (user) {
    const { error: insertError } = await supabase.from("users").insert([
      {
        name,
        lastname,
        email: email.trim().toLowerCase(),
        role: "buyer",
        created_at: new Date(),
      },
    ]);

    if (insertError) {
      console.error("Error al insertar en tabla pública:", insertError.message);
      throw insertError;
    }
  }

  console.log("✅ Registro correcto en auth y tabla pública:", user);
  return registerData;
};
