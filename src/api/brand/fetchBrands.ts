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
  is_active: boolean;
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
  to_date?: string,
  isPaginated: boolean = true,
  is_active?: boolean
): Promise<BrandsApiResponse> {
  const params: Record<string, string | number | boolean> = {};

  if (isPaginated) {
    params.page = page;
  } else {
    params.pagination = false;
  }

  if (searchTerm) params.search = searchTerm;
  if (from_date) params.from_date = from_date;
  if (to_date) params.to_date = to_date;
  if (is_active !== undefined) params.is_active = is_active;

  const response = await axios.get<BrandsApiResponse | Brand[]>(
    `/admin/brands`,
    {
      params,
    }
  );

  // When pagination=false, API returns array directly, wrap it
  if (Array.isArray(response.data)) {
    return {
      current_page: 1,
      data: response.data,
      first_page_url: "",
      from: response.data.length > 0 ? 1 : 0,
      last_page: 1,
      last_page_url: "",
      next_page_url: null,
      path: "",
      per_page: response.data.length,
      prev_page_url: null,
      to: response.data.length,
      total: response.data.length,
    };
  }

  // When paginated, API returns BrandsApiResponse
  return response.data;
}
