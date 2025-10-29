' use client';

import useSimpleProductForm from "@/hooks/useSimpleProductForm";

export default function SimpleProductForm() {
  const { register, handleSubmit, onSubmit, errors, isSubmitting, error } = useSimpleProductForm();

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-xl font-semibold mb-4">Crear producto</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Nombre</label>
          <input {...register("name", { required: "Obligatorio" })} className="w-full border p-2 rounded" />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium">Descripción</label>
          <textarea {...register("description", { required: "Obligatorio" })} className="w-full border p-2 rounded" rows={4} />
          {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
        </div>

        <div className="grid grid-cols-3 gap-2">
          <div>
            <label className="block text-sm font-medium">Precio</label>
            <input type="number" step="0.01" {...register("price", { valueAsNumber: true, required: "Obligatorio" })} className="w-full border p-2 rounded" />
            {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium">Stock</label>
            <input type="number" {...register("stock", { valueAsNumber: true, required: "Obligatorio" })} className="w-full border p-2 rounded" />
            {errors.stock && <p className="text-red-500 text-sm">{errors.stock.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium">Categoría</label>
            <input {...register("category", { required: "Obligatorio" })} className="w-full border p-2 rounded" />
            {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium">Imagen principal (opcional)</label>
          <input type="file" accept="image/*" {...register("image")} className="w-full" />
        </div>

        {error && <p className="text-red-600">{error}</p>}

        <div className="flex justify-end">
          <button type="submit" disabled={isSubmitting} className="bg-orange-500 text-white px-4 py-2 rounded">
            {isSubmitting ? "Subiendo..." : "Crear producto"}
          </button>
        </div>
      </form>
    </div>
  );
}

