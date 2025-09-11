interface PageProps {
  params: {
    productId: string;
  };
}

export default async function Page({ params }: PageProps) {
  const { productId } = await params; 

  console.log("router", productId);

  return (
    <div>
      <h1>Producto: {productId}</h1>
    </div>
  );
}
