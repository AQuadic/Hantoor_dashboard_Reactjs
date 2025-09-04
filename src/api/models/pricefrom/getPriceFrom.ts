import { axios } from "@/lib/axios";

export interface PriceFrom {
  id: number;
  name: string;
  is_active: number;
  created_at: string | null;
  updated_at: string | null;
}

export async function getPriceFrom(params?: {
  pagination?: boolean;
  is_active?: boolean;
}): Promise<PriceFrom[]> {
  const response = await axios.get<PriceFrom[]>("/admin/pricefrom", {
    params,
  });
  return response.data;
}