'use client';
// Ejemplo: pages/dashboard/seller/sales.tsx o un componente dentro de tu dashboard
import SellerSalesComponent from "@/components/organism/seller/sellerSalesComponent";

export default function SellerSalesPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Ventas de tu Tienda</h1>
      <SellerSalesComponent />
    </div>
  );
}