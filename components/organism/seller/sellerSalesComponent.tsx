'use client';

import React from 'react';
import { Loader2 } from 'lucide-react';
import { useSellerSales } from '@/hooks/useSellerSales';

import Button from '@/components/atoms/buttonComponent'; 

export default function SellerSalesComponent() {
  const { sales, loading, error, refetchSales } = useSellerSales();

  if (loading) {
    return (
      <div className="flex justify-center items-center py-10">
        <Loader2 className="animate-spin text-orange-500 mr-2" size={24} />
        <p className="text-gray-600">Cargando tus ventas...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10 border-2 border-dashed border-red-300 rounded-lg bg-red-50">
        <p className="text-red-600 text-lg mb-4">{error}</p>
        <Button onClick={refetchSales} variant="primary">Reintentar</Button>
      </div>
    );
  }

  if (sales.length === 0) {
    return (
      <div className="text-center py-10 border-2 border-dashed border-gray-300 rounded-lg">
        <p className="text-gray-500 mb-4">Aún no tienes ventas registradas.</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Your Sales</h2>
        <Button variant="primary" className="px-4 py-2" onClick={refetchSales}>
          Refresh Sales
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {sales.map((sale, index) => (
          <div key={`${sale.order_id}-${sale.product_id}-${index}`} className="border border-gray-200 rounded-md p-4 flex flex-col md:flex-row items-start md:items-center space-y-3 md:space-y-0 md:space-x-4">
            {sale.product_image_url ? (

              <img src={sale.product_image_url} alt={sale.product_name} className="w-24 h-24 object-cover rounded" />
            ) : (
              <div className="w-24 h-24 bg-gray-200 rounded flex items-center justify-center text-gray-500 text-xs text-center">
                No Image
              </div>
            )}
            <div className="flex-grow">
              <h3 className="font-semibold text-lg text-gray-800">{sale.product_name}</h3>
              <p className="text-indigo-600 font-bold mt-1">
                Total Orden: ${sale.total_paid?.toFixed(2) || 'N/A'} (Orden #{sale.order_id})
              </p>
              <p className="text-black-600 mt-1">
                Comprador: {sale.buyer_name} ({sale.buyer_email})
              </p>
              <p className="text-black-600  mt-1">
                Cantidad:{sale.order_item_quantity} | Precio Unitario: ${sale.order_item_unit_price.toFixed(2)}
              </p>
              <p className="text-black-600 mt-1">
                Fecha de Orden: {new Date(sale.order_date).toLocaleDateString()}
              </p>
              <p className="text-black-600 mt-1">
                Dirección de Envío: {sale.buyer_address} | Teléfono: {sale.buyer_phone}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}