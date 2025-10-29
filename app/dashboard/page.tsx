' use client';
import Link from "next/link";

import ProductGrid from "@/components/organism/productGridComponent";
import CategoryGrid from "@/components/molecules/categoryGridComponent";
import PromoBanner from "@/components/atoms/promoBannerComponent";
import RegionalConfigAlert from "@/components/molecules/regionalConfigAlertComponent";

import { supabase } from "@/libs/supabaseClient";

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
