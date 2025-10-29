
import { CartItem } from "@/interfaces/shoppingInterfaces/cartInterface";
import { order } from "@/interfaces/shoppingInterfaces/orderInterface";

import { supabase } from "@/libs/supabaseClient";

export const buyerService = {
    async createPurchase(
        cartItems: CartItem[], 
        address: string, 
        userInfo: {
            fullName: string;
            phone: string;
            email: string;
        },
        userId: string | number
    ): Promise<{success: boolean, purchaseId?: string}> {
        try {
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        
        if (userError || !user) {
            throw new Error("Usuario no autenticado");
        }
        
      const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

        const { data, error } = await supabase
            .from('shops')
            .insert([
            {
                gmail: userInfo.email,
                total,
                state: 'pendiente',
                adress: address,
                date: new Date().toISOString().split('T')[0],
                phone: userInfo.phone,
                user_id: user.id,
                user_name: userInfo.fullName,
                products: cartItems
            }
            ])
            .select('id') 
            .single(); 

        if (error) throw error;

        return { success: true, purchaseId: data.id };

        } catch (error: any) {
        console.error("Error en buyerService:", error);
        throw error;
        }
    },

    async getUserPurchases(userId: string): Promise<order[]> {
        const { data: { user } } = await supabase.auth.getUser();
    
        if (!user) throw new Error("Usuario no autenticado");

        const { data, error } = await supabase
        .from('shops')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

        if (error) throw error;

        return (data as order[]) || [];
    }
};