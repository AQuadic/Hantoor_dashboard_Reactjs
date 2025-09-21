import { axios } from "@/lib/axios";

export interface PriceTo {
  id: number;
  name: string;
  is_active?: boolean;
  created_at?: string | null;
  updated_at?: string | null;
}

export const getPriceToById= async (id: number): Promise<PriceTo> => {
  const res = await axios.get<PriceTo>(`/admin/priceto/${id}`);
  return res.data; 
};
