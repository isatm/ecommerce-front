// app/page.tsx
import { supabase } from "@/libs/supabaseClient";
import ProductGrid from "@/components/organism/productGrid";
import CategoryGrid from "@/components/molecules/categoryGrid";
import PromoBanner from "@/components/atoms/promoBanner";
import RegionalConfigAlert from "@/components/molecules/regionalConfigAlert";
import Link from "next/link";

export default async function HomePage() {
  const { data: products, error } = await supabase
    .from("products")
    .select("*")
    .limit(8); 

  if (error) {
    console.error(error.message);
    return <p>Error cargando productos</p>;
  }

  return (
    <main className="container mx-auto px-4 py-6">
      <ProductGrid products={products || []} />
      <div className="flex justify-center my-8">
        <Link
          href="/products"
          className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded"
        >
          Ver todo
        </Link>
      </div>
      <CategoryGrid />
      <PromoBanner />
      <RegionalConfigAlert />
    </main>
  );
}
