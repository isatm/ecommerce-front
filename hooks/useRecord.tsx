'use client'

import { useState, useEffect } from 'react';
import { supabase } from '@/libs/supabaseClient';
import { order } from '@/interfaces/shoppingInterfaces/orderInterface';
import { useAuth } from '@/contexts/authContext';

export function useRecord() {
    const [shops, setShops] = useState<order[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { user, loading: authLoading } = useAuth();

    useEffect(() => {
        if (user) {
            fetchUserPurchases();
        }
    }, [user]); // ✅ Agregar user como dependencia

    const fetchUserPurchases = async () => {
        try {
            setLoading(true);
            setError(null);

            if (!user) {
                setError('Usuario no autenticado');
                return;
            }

            const { data: purchases, error: purchasesError } = await supabase
                .from('shops')
                .select('*')
                .eq('user_id', user.id)
                .order('created_at', { ascending: false });

            if (purchasesError) {
                throw purchasesError;
            }

            const formattedShops: order[] = (purchases || []).map(purchase => ({
                fullname: purchase.fullname,
                id: purchase.id,
                gmail: purchase.gmail,
                user_id: user.id,
                total: purchase.total,
                state: purchase.state,
                address: purchase.adress, 
                date: purchase.date,
                phone: purchase.phone,
                created_at: purchase.created_at,
                products: purchase.products || [],
            }));

            setShops(formattedShops);

        } catch (err: any) {
            console.error('Error fetching purchases:', err);
            setError(err.message || 'Error al cargar el historial');
        } finally {
            setLoading(false);
        }
    };

    return {
        shops,
        loading: loading || authLoading,
        error,
        refetch: fetchUserPurchases
    };
}