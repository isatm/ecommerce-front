export interface SellerSale {
    order_id: number;
    order_date: string;
    total_paid: number; 
    product_id: number;
    order_item_quantity: number;
    order_item_unit_price: number;
    buyer_id: string;
    buyer_name: string;
    buyer_email: string; 
    buyer_address: string; 
    buyer_phone: string; 
    product_name: string;
    product_image_url: string | null;
}