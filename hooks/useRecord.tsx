'use client'

import { useState, useEffect } from 'react';

import { supabase } from '@/libs/supabaseClient';
import { orders } from '@/interfaces/shoppingInterfaces/orderInterface';
import { useAuth } from '@/contexts/authContext';

export function useRecord() {
    const [shops, setShops] = useState<orders[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { user } = useAuth();

    useEffect(() => {
        if (user) {
            fetchUserPurchases();
        }
    }, [user]); 

    const fetchUserPurchases = async () => {
        try {
            setLoading(true);
            setError(null);

            if (!user) {
                setError('Usuario no autenticado');
                return;
            }

            const { data: purchases, error: purchasesError } = await supabase
                .from('orders') 
                .select(`
                    *,
                    order_items (
                        *,
                        products (*)
                    )
                `)
                .eq('user_id', user.id)
                .order('date', { ascending: false }); 

            if (purchasesError) throw purchasesError;

            const formattedShops: orders[] = (purchases || []).map(purchase => ({
                id: purchase.id,
                fullname: purchase.fullname,
                user_id: purchase.user_id,
                total: purchase.total,
                status: purchase.status, 
                address: purchase.address, 
                date: purchase.date,
                phone: purchase.phone,
                created_at: purchase.created_at,
                order_items: purchase.order_items || [], 
                gmail: purchase.gmail,
            }));

            setShops(formattedShops);

        } catch (err: any) {
            console.error('Error fetching purchases:', err);
            setError(err.message || 'Error al cargar el historial');
        } finally {
            setLoading(false);
        }
    };

    return { shops, loading, error, refetch: fetchUserPurchases };
}