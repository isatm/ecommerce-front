// hooks/useRecord.ts
import { useState, useEffect } from 'react';
import { supabase } from '@/libs/supabaseClient';
import { Shop } from '@/interfaces/shoppingInterfaces/shopInterface';

export function useRecord() {
    const [shops, setShops] = useState<Shop[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchUserPurchases();
    }, []);

    const fetchUserPurchases = async () => {
        try {
        setLoading(true);
        setError(null);

        const { data: { user }, error: userError } = await supabase.auth.getUser();
        
        if (userError || !user) {
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

        const formattedShops: Shop[] = (purchases || []).map(purchase => ({
            id: purchase.id,
            gmail: purchase.gmail,
            total: purchase.total,
            state: purchase.state,
            adress: purchase.adress,
            date: purchase.date,
            phone: purchase.phone,
            created_at: purchase.created_at,
            products: purchase.products || [],
            price: purchase.price,
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
        loading,
        error,
        refetch: fetchUserPurchases
    };
}