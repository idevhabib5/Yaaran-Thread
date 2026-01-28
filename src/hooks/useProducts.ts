import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Product } from "@/lib/data";

// Transform database product to frontend Product interface
function transformProduct(dbProduct: {
  id: string;
  name: string;
  description: string;
  price: number;
  original_price: number | null;
  category: string;
  images: string[];
  is_new: boolean | null;
  is_limited: boolean | null;
  colors: string[] | null;
  sizes: string[] | null;
  stock: number;
  care_instructions: string[] | null;
  delivery_days: number;
}): Product {
  return {
    id: dbProduct.id,
    name: dbProduct.name,
    description: dbProduct.description,
    price: dbProduct.price,
    originalPrice: dbProduct.original_price ?? undefined,
    category: dbProduct.category as Product["category"],
    images: dbProduct.images,
    isNew: dbProduct.is_new ?? undefined,
    isLimited: dbProduct.is_limited ?? undefined,
    colors: dbProduct.colors ?? undefined,
    sizes: dbProduct.sizes ?? undefined,
    stock: dbProduct.stock,
    careInstructions: dbProduct.care_instructions ?? undefined,
    deliveryDays: dbProduct.delivery_days,
  };
}

export function useProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("is_active", true)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data.map(transformProduct);
    },
  });
}

export function useProduct(id: string) {
  return useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .eq("is_active", true)
        .maybeSingle();

      if (error) throw error;
      if (!data) return null;
      return transformProduct(data);
    },
    enabled: !!id,
  });
}
