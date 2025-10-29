import { Product } from "./productInterface";

export interface order{
    fullname: string;
    gmail: string;
    total: number;
    state: 'pendiente' | 'completado' | 'cancelado';
    address: string;
    created_at?: string;
    date: string;
    products: Product[];
    phone: string;
}
