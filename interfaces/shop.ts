import { Product } from "./product";

export interface Shop{
    user_id: string;
    total: number;
    state: 'pendiente' | 'completado' | 'cancelado';
    adress: string;
    created_at?: string;
    date: string;
    prducts: Product
}
