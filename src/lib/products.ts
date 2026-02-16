import { supabase } from "./supabase";

export async function getProducts() {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}

export async function createProduct(product: {
  name: string;
  price: number;
  stock: number;
}) {
  const { error } = await supabase.from("products").insert(product);
  if (error) throw error;
}

export async function deleteProduct(id: string) {
  const { error } = await supabase
    .from("products")
    .delete()
    .eq("id", id);

  if (error) throw error;
}
export async function updateProduct(
  id: string,
  updates: {
    name: string;
    price: number;
    stock: number;
    image_url: string;
  }
) {
  const { error } = await supabase
    .from("products")
    .update(updates)
    .eq("id", id);

  if (error) throw error;
}

