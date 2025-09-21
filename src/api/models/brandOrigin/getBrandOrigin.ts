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

export const getBrandOrigin = async (): Promise<BrandOrigin[]> => {
  const res = await axios.get<BrandOriginResponse>("/admin/brand-origin");
  return res.data.data;
};

// Paginated variant - accepts optional page and search params and returns full response
export const getBrandOriginPaginated = async (params?: {
  page?: number;
  search?: string;
  from_date?: string;
  to_date?: string;
}): Promise<BrandOriginResponse> => {
  const query: Record<string, any> = {};
  if (params?.page) query.page = params.page;
  if (params?.search) query.search = params.search;
  if (params?.from_date) query.from_date = params.from_date;
  if (params?.to_date) query.to_date = params.to_date;

  const res = await axios.get<BrandOriginResponse>("/admin/brand-origin", {
    params: query,
  });
  return res.data as BrandOriginResponse;
};
