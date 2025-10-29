import { supabase } from "@/libs/supabaseClient";

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