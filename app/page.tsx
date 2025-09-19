// app/page.tsx
import { supabase } from "@/libs/supabaseClient";
import ProductGrid from "@/components/organism/productGrid";
import CategoryGrid from "@/components/molecules/categoryGrid";
import PromoBanner from "@/components/atoms/promoBanner";
import RegionalConfigAlert from "@/components/molecules/regionalConfigAlert";

export default async function HomePage() {
  const { data: products, error } = await supabase.from("products").select("*");

  if (error) {
    console.error(error.message);
    return <p>Error cargando productos</p>;
  }

  return (
    <main className="container mx-auto px-4 py-6">
      <ProductGrid products={products || []} />
      <CategoryGrid />
      <PromoBanner />
      <RegionalConfigAlert />
    </main>
  );
}