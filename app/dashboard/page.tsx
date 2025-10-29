'use client';

import React from 'react';
import DashboardHeader from '@/components/organism/dashBoardHeaderComponent';
import TabNavigation from '@/components/molecules/tabNavigationComponent';

// Importa tus componentes de contenido para cada pestaña
import RecordComponent from '@/components/organism/buyer/recordDatailComponent';
import SellerListingsComponent from '@/components/organism/seller/sellerListingsComponent';

export default function DashboardPage() {

  // Define las pestañas del dashboard
  const tabs = [
    { name: 'Dashboard', href: '/dashboard', content: <p>Dashboard general content goes here.</p> },
    { name: 'Purchases', href: '/dashboard/buyer/details', content: <RecordComponent /> },
    { name: 'Selling', href: '/dashboard/seller/listings', content: <SellerListingsComponent /> },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Encabezado del Dashboard */}
      <DashboardHeader />

      {/* Navegación de Pestañas */}
      <TabNavigation tabs={tabs} basePath="/dashboard" />

      {/* Contenido de la Pestaña Activa */}
      <div className="mt-6">
        {/* Este div contendrá el contenido de la pestaña activa,
            Next.js se encargará de renderizar el `page.tsx` correspondiente a la ruta.
            Si no usas rutas anidadas para el contenido de las pestañas,
            podrías renderizar `currentTabContent` directamente aquí.
        */}
        {/* Para usar el contenido de los page.tsx anidados, simplemente se renderiza el children de la ruta.
            Este componente actua como un layout para las rutas anidadas.
            Next.js automáticamente renderizará el page.tsx correspondiente dentro del layout.
        */}
        {/* Para que los `page.tsx` anidados funcionen como contenido de las pestañas,
            el `TabNavigation` debe manejar solo la navegación, y los `page.tsx`
            de `/dashboard/buyer/purchases` y `/dashboard/seller/listings`
            deben ser los que rendericen `RecordDetailComponent` y `SellerListingsComponent` respectivamente.
        */}
        {/* Aquí asumimos que los page.tsx anidados son los que renderizan el contenido. */}
        {/* Si quieres que el `TabNavigation` renderice el contenido, descomenta:
            {currentTabContent}
            Y asegúrate de que tus `page.tsx` anidados sean solo redirecciones o no existan como tal.
        */}
      </div>
    </div>
  );
}