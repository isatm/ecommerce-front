import { supabase } from "@/libs/supabaseClient";

export async function searchProducts(term: string) {
  if (!term) {
    return [];
  }

  const { data, error } = await supabase
    .from("products")
    .select("id, name")
    .ilike("name", `${term}%`) 
    .limit(5); 

  if (error) {
    throw new Error(error.message);
  }

  return data || [];
}
