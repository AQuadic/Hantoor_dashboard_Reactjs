import { axios } from "@/lib/axios";

export interface BrandOrigin {
  id: number;
  is_active: boolean;
  name: {
    ar: string;
    en: string;
  };
  created_at: string;
  updated_at: string;
}

interface BrandOriginResponse {
  current_page: number;
  data: BrandOrigin[];
  total?: number;
  per_page?: number;
  from?: number;
  to?: number;
}

export const getBrandOrigin = async (
  pagination: boolean = true
): Promise<BrandOrigin[] | BrandOriginResponse> => {
  const params: Record<string, boolean> = {};
  if (!pagination) {
    params.pagination = false;
  }

  const res = await axios.get<BrandOrigin[] | BrandOriginResponse>(
    "/admin/brand-origin",
    { params }
  );

  // When pagination=false, API returns array directly
  if (Array.isArray(res.data)) {
    return res.data;
  }

  // When paginated, API returns BrandOriginResponse
  return res.data;
};

// Paginated variant - accepts optional page and search params and returns full response
export const getBrandOriginPaginated = async (params?: {
  page?: number;
  search?: string;
  from_date?: string;
  to_date?: string;
}): Promise<BrandOriginResponse> => {
  const query: Record<string, unknown> = {};
  if (params?.page) query.page = params.page;
  if (params?.search) query.search = params.search;
  if (params?.from_date) query.from_date = params.from_date;
  if (params?.to_date) query.to_date = params.to_date;

  const res = await axios.get<BrandOriginResponse>("/admin/brand-origin", {
    params: query,
  });
  return res.data;
};
