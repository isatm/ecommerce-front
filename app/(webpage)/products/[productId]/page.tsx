import { supabase } from "../../../../libs/supabaseClient";

interface PageProps {
  params: {
    productId: string;
  };
}

export default async function Page({ params }: PageProps) {
  const { productId } = params;

  // Buscar producto en Supabase
  const { data: product, error } = await supabase
    .from("products")
    .select("id, name, description, price, category, stock, image_url, created_at")
    .eq("id", productId)
    .maybeSingle();

  console.log("router", productId);

  if (error) {
    console.error(error);
    return <div>Error al cargar el producto</div>;
  }

  if (!product) {
    return <div>Producto no encontrado</div>;
  }

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>Categoría: {product.category}</p>
      <p>Precio: ${product.price}</p>
      <p>Stock: {product.stock}</p>
      {product.image_url && (
        <img src={product.image_url} alt={product.name} width={300} />
      )}
    </div>
  );
}