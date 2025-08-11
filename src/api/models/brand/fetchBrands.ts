import { axios } from "@/lib/axios";

export interface Brand {
  id: number;
  name: { ar: string; en: string };
  is_active: number;
  image?: string;
  created_at?: string;
  updated_at?: string;
  count?: number;
}

export async function fetchBrands(): Promise<Brand[]> {
  const response = await axios.get("/admin/brands");
  return response.data as Brand[];
}
