import { axios } from "@/lib/axios";

export interface BrandImage {
  id: number;
  model_type: string;
  model_id: number;
  uuid: string;
  collection_name: string;
  name: string;
  file_name: string;
  mime_type: string;
  disk: string;
  conversions_disk: string;
  size: number;
  manipulations: unknown[];
  custom_properties: unknown[];
  generated_conversions: unknown[];
  responsive_images: unknown[];
  order_column: number;
  created_at: string;
  updated_at: string;
  original_url: string;
  preview_url: string;
}

export interface Brand {
  id: number;
  name: { ar: string; en: string };
  is_active: number;
  image?: BrandImage;
  created_at?: string;
  updated_at?: string;
  count?: number;
  vehicles_count?: number;
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
  page: number = 1,
  searchTerm: string = "",
  from_date?: string,
  to_date?: string
): Promise<BrandsApiResponse> {
  const params: Record<string, string | number> = { page };
  if (searchTerm) params.search = searchTerm;
  if (from_date) params.from_date = from_date;
  if (to_date) params.to_date = to_date;
  const response = await axios.get(`/admin/brands`, { params });
  return response.data as BrandsApiResponse;
}
