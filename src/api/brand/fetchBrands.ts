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
  isPaginated: boolean = true
): Promise<BrandsApiResponse> {
  if (isPaginated) {
    const params: Record<string, string | number> = { page };
    if (searchTerm) params.search = searchTerm;
    if (from_date) params.from_date = from_date;
    if (to_date) params.to_date = to_date;

    const response = await axios.get<BrandsApiResponse>(`/admin/brands`, {
      params,
    });
    return response.data;
  }

  // Non-paginated: gather all pages and return a BrandsApiResponse-shaped object
  let allBrands: Brand[] = [];
  let currentPage = 1;
  let totalPages = 1;

  do {
    const params: Record<string, string | number> = { page: currentPage };
    if (searchTerm) params.search = searchTerm;
    if (from_date) params.from_date = from_date;
    if (to_date) params.to_date = to_date;

    const response = await axios.get<BrandsApiResponse>(`/admin/brands`, {
      params,
    });
    const data = response.data;
    allBrands = [...allBrands, ...data.data];
    totalPages = data.last_page || 1;
    currentPage++;
  } while (currentPage <= totalPages);

  return {
    current_page: 1,
    data: allBrands,
    first_page_url: "",
    from: allBrands.length > 0 ? 1 : 0,
    last_page: 1,
    last_page_url: "",
    next_page_url: null,
    path: "",
    per_page: allBrands.length,
    prev_page_url: null,
    to: allBrands.length,
    total: allBrands.length,
  } as BrandsApiResponse;
}
