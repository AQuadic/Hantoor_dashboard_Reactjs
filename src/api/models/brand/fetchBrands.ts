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

export interface BrandsApiResponse {
  current_page: number;
  data: Brand[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

export async function fetchBrands(
  page: number = 1
): Promise<BrandsApiResponse> {
  const response = await axios.get(`/admin/brands?page=${page}`);
  return response.data as BrandsApiResponse;
}
