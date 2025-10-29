import { Suspense } from 'react';
import ProductGrid from '@/components/organism/productGridComponent';
import { searchProductsByQuery } from "@/libs/services/productService"; 

interface SearchPageProps {
  searchParams: Promise<{
    query: string;
  }>;
}

async function SearchResults({ query }: { query: string }) {
  if (!query) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">Resultados de búsqueda</h1>
        <p className="text-gray-600">Por favor, ingresa un término de búsqueda en el header.</p>
      </div>
    );
  }

  const products = await searchProductsByQuery(query);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Resultados para: {query}</h1>
      {products.length === 0 ? (
        <p className="text-gray-600">No se encontraron productos que coincidan con tu búsqueda.</p>
      ) : (
        <ProductGrid products={products} />
      )}
    </div>
  );
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  return (
    <Suspense fallback={<div>Cargando resultados...</div>}>
      <SearchResults query={(await searchParams).query} />
    </Suspense>
  );
}