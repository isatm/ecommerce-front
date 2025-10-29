//import { apiFetch } from "./singletonFetch"

import { RegisterDTO } from "@/interfaces/registerInterfaces/registerInterface"
import Cookies from "js-cookie";
import { LoginDTO } from "@/interfaces/loginInterfaces/loginInterface"
import { supabase } from "@/libs/supabaseClient";

export const loginService = async (body: LoginDTO) => {
  const { email, password } = body;

  // login con Supabase
  const { data: loginData,  error } = await supabase.auth.signInWithPassword({
    email, 
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
