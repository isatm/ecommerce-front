//import { apiFetch } from "./singletonFetch"
import { RegisterDTO } from "@/interfaces/register"
import Cookies from "js-cookie";
import { LoginDTO } from "@/interfaces/login"
import { supabase } from "@/libs/supabaseClient";

export const loginService = async (body: LoginDTO) => {
  const { user, password } = body;

  // login con Supabase
  const { data: loginData, error } = await supabase.auth.signInWithPassword({
    email: user, // aquí 'user' es realmente el email
    password,
  });

  if (error) {
    console.error("Error en login ❌", error.message);
    throw error;
  }

  // guardar token en cookies
  if (loginData.session) {
    Cookies.set("token", loginData.session.access_token, {
      expires: 7,
      secure: true,
      sameSite: "strict",
    });
    console.log("Login correcto ✅");
  }

  return loginData;
};

/*
export const registerService = async (formData: RegisterDTO) => {
  const { name, lastname, email, password } = formData; 

  const { data, error } = await supabase.auth.signUp({
    email: email.trim().toLowerCase(),
    password,
    options: {
      data: {
        name,
        lastname,
      },
    },
  });

  if (error) {
    console.error("Error en registerService:", error.message);
    return null; // aquí devolvemos null si falla
  }

  console.log("Usuario registrado en Supabase:", data);
  return data; // esto contiene { user, session }
};*/