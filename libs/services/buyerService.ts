
import { CartItem } from "@/interfaces/shoppingInterfaces/cartInterface";
import { orders } from "@/interfaces/shoppingInterfaces/orderInterface";

import { supabase } from "@/libs/supabaseClient";


export const buyerService = {
    async createPurchase(
        cartItems: CartItem[], 
        address: string, 
        userInfo: {
            fullName: string;
            phone: string;
            gmail: string;
        },
        userId: string | number
    ): Promise<{success: boolean, purchaseId?: string}> {
        try {
            console.log('buyerService.createPurchase INICIADO');
            
            if (!userId) {
                throw new Error("Usuario no autenticado");
            }

            const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

            const orderData = {
                user_id: userId, 
                total: total,
                status: 'pending',
                fullname: userInfo.fullName,
                address: address,
                phone: userInfo.phone,
                date: new Date().toISOString().split('T')[0],
                gmail: userInfo.gmail,
            };

            console.log('Insertando en orders:', orderData);

            const { data: order, error: orderError } = await supabase
                .from('orders') 
                .insert([orderData])
                .select('id') 
                .single(); 

            if (orderError) {
                console.error('Error creando orden:', orderError);
                throw orderError;
            }

            console.log('Orden creada. ID:', order.id);

            const orderItems = cartItems.map(item => ({
                order_id: order.id,
                product_id: item.id,
                quantity: item.quantity,
                unit_price: item.price
            }));

            const { error: itemsError } = await supabase
                .from('order_items')
                .insert(orderItems);

            if (itemsError) {
                console.error('Error creando order items:', itemsError);
                throw itemsError;
            }

            return { success: true, purchaseId: order.id.toString() };

        } catch (error: any) {
            console.error("Error en buyerService:", error);
            throw error;
        }
    },

    async getUserPurchases(userId: string): Promise<orders[]> {
        try {
            if (!userId) throw new Error("Usuario no autenticado");

            const { data, error } = await supabase
                .from('ordery') 
                .select(`
                    *,
                    order_items (
                        *,
                        products (*)
                    )
                `)
                .eq('user_id', userId)
                .order('date', { ascending: false }); 

            if (error) throw error;

            return (data as orders[]) || [];
        } catch (error: any) {
            console.error("Error getting user purchases:", error);
            throw error;
        }
    }
};