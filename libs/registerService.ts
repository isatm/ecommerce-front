import { RegisterDTO } from "@/interfaces/register";
import Cookies from "js-cookie";
import { supabase } from "@/libs/supabaseClient";

export const registerService = async (body : RegisterDTO) => {
    const  {name, lastname, email, password} = body

    const { data: registerData, error } = await supabase.auth.signUp({
        email: email.trim().toLowerCase(),
        password,
        options: {
            data: {
                name,
                lastname,
            },
        },
    });
    if(error) {
        console.error("Error al registrarse, informacion no completa ", error.message)
        throw error;
    }

    console.log("Registro correcto", registerData);
    return registerData;
}
