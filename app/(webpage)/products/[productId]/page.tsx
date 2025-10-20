import { supabase } from "@/libs/supabaseClient";
import ProductItem from "@/components/organism/productItem"
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{
    productId: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  const obteinId = async () => {
    const { productId } = await params
    return productId || ''
  }

  const { data: product, error } = await supabase
    .from("products")
    .select("id, name, description, price, category, stock, image_url, created_at")
    .eq("id", await obteinId())
    .maybeSingle();

    if (error) {
        notFound();
    }

  if (!product) {
    return <div>Producto no encontrado</div>;
  }

  return <ProductItem product={product} />;
}