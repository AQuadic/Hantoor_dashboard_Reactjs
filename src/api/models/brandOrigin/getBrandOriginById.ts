import { axios } from "@/lib/axios";

export interface BrandOrigin {
  id: number;
  name: { ar: string; en: string };
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

export const getBrandOriginById = async (id: number): Promise<BrandOrigin> => {
  const res = await axios.get<BrandOrigin>(`/admin/brand-origin/${id}`);
  return res.data;
};
