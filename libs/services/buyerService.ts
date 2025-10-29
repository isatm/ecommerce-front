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

            for (const item of cartItems) {
                const { data: product, error: productError } = await supabase
                    .from('products')
                    .select('stock')
                    .eq('id', item.id)
                    .single();

                if (productError || !product) {
                    throw new Error(`Producto ${item.name} no encontrado o error al verificar stock.`);
                }
                if (product.stock < item.quantity) {
                    throw new Error(`Stock insuficiente para el producto: ${item.name}. Disponible: ${product.stock}, Solicitado: ${item.quantity}`);
                }
            }

            const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

            const orderData = {
                user_id: userId, 
                total: total,
                status: 'pending', // O 'completed', porquen el hermoso supabase pide en inglés
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
                await supabase.from('orders').delete().eq('id', order.id); // Revertir orden
                throw itemsError;
            }

            for (const item of cartItems) {
                const { error: updateError } = await supabase
                    .from('products')
                    .update({ stock: (await getProductStock(item.id)) - item.quantity }) // Obtener stock actual y restar
                    .eq('id', item.id);

                if (updateError) {
                    console.error(`Error al actualizar stock para producto ${item.id}:`, updateError);
                    await supabase.from('order_items').delete().eq('order_id', order.id); // Revertir items de la orden
                    await supabase.from('orders').delete().eq('id', order.id); // Revertir orden
                    throw new Error(`Fallo al actualizar el stock del producto ${item.name}. La compra ha sido cancelada.`);
                }
                console.log(`Stock actualizado para producto ${item.id}.`);
            }

            async function getProductStock(productId: number | string): Promise<number> {
                const { data, error } = await supabase
                    .from('products')
                    .select('stock')
                    .eq('id', productId)
                    .single();
                if (error || !data) {
                    console.error("Error al obtener stock actual:", error);
                    return 0; 
                }
                return data.stock;
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
                .from('orders') 
                .select(`
                    *,
                    order_items (
                        *,
                        products (
                            id, 
                            name, 
                            image_url, 
                            price 
                        )
                    )
                `)
                .eq('user_id', userId)
                .order('date', { ascending: false }); 

            if (error) throw error;

            return (data as unknown as orders[]) || [];
        } catch (error: any) {
            console.error("Error getting user purchases:", error);
            throw error;
        }
    }
};