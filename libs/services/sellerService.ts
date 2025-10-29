import { SellerSale } from "@/interfaces/shoppingInterfaces/sellerSaleInterface";
import { supabase } from "@/libs/supabaseClient";


export const sellerService = {
    async getSellerSales(sellerId: string | number): Promise<SellerSale[]> {
        try {
            if (!sellerId) {
                throw new Error("ID de vendedor no proporcionado");
            }

            // Unimos order_items con orders, products y users (compradores)
            const { data, error } = await supabase
                .from('order_items')
                .select(`
                    order_id,
                    quantity,
                    unit_price,
                    products (
                        id,
                        name,
                        image_url
                    ),
                    orders (
                        id,
                        created_at,
                        total,
                        fullname,
                        address,
                        phone,
                        gmail,
                        users (
                            id,
                            name,
                            email
                        )
                    )
                `)
                .filter('products.seller_id', 'eq', sellerId) // Filtramos por los productos del vendedor
                .order('order_id', { ascending: false }); // Ordenamos por las órdenes más recientes

            if (error) {
                console.error("Error fetching seller sales:", error);
                throw error;
            }

            // Mapear los datos para que sean más fáciles de usar
            const sales: SellerSale[] = data.map((item: any) => ({
                order_id: item.order_id,
                order_date: item.orders?.created_at,
                total_paid: item.orders?.total,
                order_item_quantity: item.quantity,
                order_item_unit_price: item.unit_price,
                product_id: item.products?.id,
                product_name: item.products?.name,
                product_image_url: item.products?.image_url,
                buyer_id: item.orders?.users?.id,
                buyer_name: item.orders?.users?.name,
                buyer_email: item.orders?.users?.email,
                buyer_address: item.orders?.address,
                buyer_phone: item.orders?.phone,
            }));

            return sales;

        } catch (error: any) {
            console.error("Error in getSellerSales:", error);
            throw error;
        }
    }
};