import { Product } from "./productInterface";

export interface Shop{
    gmail: string;
    total: number;
    state: 'pendiente' | 'completado' | 'cancelado';
    adress: string;
    created_at?: string;
    date: string;
    products: Product[];
    phone: string;
}
