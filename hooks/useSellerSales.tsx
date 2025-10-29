'use client';

import { useState, useEffect } from 'react';

import { useAuth } from '@/contexts/authContext';
import { sellerService } from '@/libs/services/sellerService';
import { SellerSale } from '@/interfaces/shoppingInterfaces/sellerSaleInterface';
import { UseSellerSalesResult } from '@/interfaces/shoppingInterfaces/useSellerSalesResult';

export function useSellerSales(): UseSellerSalesResult {
  const { user, loading: authLoading } = useAuth();
  const [sales, setSales] = useState<SellerSale[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSales = async () => {
    if (authLoading || !user) {
      if (!authLoading && !user) {
        setError("Debes iniciar sesión para ver tus ventas.");
      }
      setLoading(false);
      return;
    }

    if (user.role !== 'seller') {
      setError("Tu rol no te permite ver la sección de ventas.");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      // El sellerService ya devuelve SellerSale[], así que esto debería ser compatible
      const fetchedSales = await sellerService.getSellerSales(user.id); 
      setSales(fetchedSales);
    } catch (err) {
      console.error("Error al cargar las ventas del vendedor:", err);
      setError("Error al cargar tus ventas. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSales();
  }, [user, authLoading]);

  return { sales, loading, error, refetchSales: fetchSales };
}