import { RegisterDTO } from "@/interfaces/registerInterfaces/registerInterface";
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
                role: "buyer",
            },
        },
    });
    if(error) {
        console.error("Error al registrarse, informacion no completa ", error.message)
        throw error;
    }
    
    console.log("Registro correcto", registerData);
    console.log("Rol del usuario:", registerData?.user?.user_metadata?.role);
    console.log("Registro correcto", registerData);
    return registerData;
}
