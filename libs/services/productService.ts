import { supabase } from "@/libs/supabaseClient";
import { Product } from "@/interfaces/shoppingInterfaces/productInterface"; 

export async function getProductById(id: string): Promise<Product | null> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error("Error fetching product by ID:", error);
    return null;
  }
  return data as Product;
}

export async function searchProductSuggestions(term: string): Promise<Partial<Product>[]> {
  if (!term || term.length < 2) { 
    return [];
  }

  const { data, error } = await supabase
    .from("products")
    .select("id, name, image_url, price, category, stock, description, seller_id") 
    .ilike("name", `${term}%`) 
    .limit(5);

  if (error) {
    console.error("Error searching product suggestions:", error.message);
    return []; 
  }
  
  return data.map(item => ({ 
    id: item.id, 
    name: item.name, 
    price: item.price, 
    image_url: item.image_url,
    category: item.category,
    stock: item.stock,
    description: item.description,
    seller_id: item.seller_id 
  })) || [];
}

export async function searchProductsByQuery(query: string): Promise<Product[]> {
  if (!query) {
    return [];
  }

  const { data, error } = await supabase
    .from('products')
    .select('*') 
    .ilike('name', `%${query}%`) 
    .order('name', { ascending: true }); 

  if (error) {
    console.error("Error searching products by query:", error.message);
    return [];
  }
  return data as Product[];
}

export async function getUserNameById(userId: number): Promise<string | null> {
  const { data, error } = await supabase
    .from('users') 
    .select('name') 
    .eq('id', userId)
    .single(); 

  if (error) {
    console.error(`Error fetching user name for ID ${userId}:`, error.message);
    return null;
  }
  
  return data?.name || null;
}