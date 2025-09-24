import { axios } from "@/lib/axios";

export interface Country {
  id: number;
  name: { ar: string; en: string };
  code: string;
}

export interface PriceFrom {
  id: number;
  name: string;
  is_active: number;
  created_at: string | null;
  updated_at: string | null;
  country?: Country | null; 
}

export interface PriceFromResponse {
  data: PriceFrom[];
  current_page: number;
  last_page: number;
  per_page: number;
  from: number;
  to: number;
  total: number;
}

export interface GetPriceFromParams {
  pagination?: boolean;
  is_active?: boolean;
  page?: number;
  search?: string;
  country_id?: number;
}

export async function getPriceFrom(
  params?: GetPriceFromParams
): Promise<PriceFromResponse> {
  const response = await axios.get("/admin/pricefrom", {
    params: {
      ...params,
      search: params?.search || undefined,
    },
  });

  if (Array.isArray(response.data)) {
    let filtered = response.data;

    if (params?.search) {
      const keyword = params.search.toLowerCase();
      filtered = filtered.filter((item: PriceFrom) =>
        item.name.toLowerCase().includes(keyword)
      );
    }

    return {
      data: filtered,
      current_page: 1,
      last_page: 1,
      per_page: filtered.length,
      from: filtered.length > 0 ? 1 : 0,
      to: filtered.length,
      total: filtered.length,
    };
  }

  return response.data as PriceFromResponse;
}