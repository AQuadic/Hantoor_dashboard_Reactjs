import { axios } from "@/lib/axios";

export interface PriceFrom {
  id: number;
  name: string;
  is_active?: boolean;
  created_at?: string | null;
  updated_at?: string | null;
}

export const getPriceFromById= async (id: number): Promise<PriceFrom> => {
  const res = await axios.get<PriceFrom>(`/admin/pricefrom/${id}`);
  return res.data; 
};
