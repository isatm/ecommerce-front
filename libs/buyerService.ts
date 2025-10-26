
// Falta un mejor manejo de cartItem y Shops

import { CartItem } from "@/interfaces/cartInterface";
import { Shop } from "@/interfaces/shopInterface";

import { supabase } from "@/libs/supabaseClient";

export const buyerService = {
    async createPurchase(cartItems: CartItem[], address: string): Promise<Shop> {
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        

        // vemos si el usuario existe en el token
        if (userError || !user) {
            console.error("Error obteniendo usuario:", userError);
            throw new Error("Usuario no autenticado");
        }
        
        // obtenemos el valor total de la compra
        const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

        const { data, error } = await supabase
            .from('shops')
            .insert([
            {
                user_id: user.id,
                total,
                estado: 'pendiente',
                address: address 
            }
        ])

        // seleccionamos el primer elemento y lo retonamos
            .select() 
            .single(); 

        if (error) {
            console.error("Error al crear la compra:", error.message);
            throw error;
        }

        if (!data) {
            throw new Error("No se pudo crear la compra");
        }

        return data;
    },

    //Obtener las compras hechas por el usuario
    async getUserPurchases(): Promise<Shop[]> {
        const { data: { user } } = await supabase.auth.getUser();
    
        if (!user) {
            throw new Error("Usuario no autenticado");
        }

    const { data, error } = await supabase
        .from('shops')
        .select('*') // Por si no te acuerdas, el asterisco en amado mysql es para ver toda la columna de la compra
        .eq('user_id', user.id) // filtramos por id, no sea quie muestre que compre algo que no
        .order('created_at', { ascending: false });  // lo ordenamos de forma ascendete

    if (error) {
        console.error("Error obteniendo compras:", error);
        throw error;
    }

        return data || [];
    }
};