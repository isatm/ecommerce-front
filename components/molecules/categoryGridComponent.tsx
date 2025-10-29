import CategoryCard from "../atoms/categoryCardComponent";
import { categories } from "@/utils/categoriesUtils";

export default function CategoryGrid() {
  
  return (
    <div className="max-w-6xl mx-auto px-4 mt-12">
      <h2 className="text-2xl font-bold mb-6">Buscar por categoría</h2>
      <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6">
        {categories.map((cat) => (
          <CategoryCard key={cat.name} {...cat} />
        ))}
      </div>
    </div>
  );
}
