import { supabase } from "@/libs/supabaseClient";

export async function searchProducts(term: string) {
  if (!term) {
    return [];
  }

  // Buscar productos cuyo nombre EMPIECE con el término
  const { data, error } = await supabase
    .from("products")
    .select("id, name")
    .ilike("name", `${term}%`) // "empieza con"
    .limit(5); // 👈 solo 5 resultados (puedes quitarlo)

  if (error) {
    throw new Error(error.message);
  }

  return data || [];
}
