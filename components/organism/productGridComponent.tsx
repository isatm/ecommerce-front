
import ProductCard from "@/components/molecules/productCardComponent";
import { Product } from "@/interfaces/productInterface";

export default function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="max-w-6xl mx-auto px-4">
      <h2 className="text-2xl font-bold mb-6">Equipos musicales más deseados</h2>
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((p) => (
          <ProductCard key={p.id} {...p} />
        ))}
      </div>
    </div>
  );
}
