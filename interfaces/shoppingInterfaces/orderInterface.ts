import { Product } from "./productInterface";

export interface orders{
    id?: number;
    fullname: string;
    gmail: string;
    user_id: string | number;
    total: number;
    status: 'pending' | 'completed' | 'cancelled' | 'shipped'; // por qué jodidos esperas que sea en inglés? AAA
    address: string;
    created_at?: string;
    date: string;
    phone: string;
    order_items?: OrderItem[]; 
}

export interface OrderItem{
    id?: number;
    order_id: number | string;
    product_id: number | string;
    quantity: number;
    unit_price: number
    products?: Product;
}
