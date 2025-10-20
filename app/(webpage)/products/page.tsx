// app/products/page.tsx

import { supabase } from "@/libs/supabaseClient";
import ProductGrid from "@/components/organism/productGrid";

export default async function ProductsPage() {
  const { data: products, error } = await supabase
    .from("products")
    .select("*");

  if (error) {
    console.error(error.message);
    return <p>Error cargando productos</p>;
  }

  return (
    <main className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">Todos los productos</h1>
      <ProductGrid products={products || []} />
    </main>
  );
}
