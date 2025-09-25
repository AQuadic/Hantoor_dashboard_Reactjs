import { axios } from "@/lib/axios";

export interface Country {
  id: number;
  name: { ar: string; en: string };
  code: string;
  currency_text?: { ar: string; en: string };
}

export interface PriceTo {
  id: number;
  name: string;
  is_active: number;
  created_at: string | null;
  updated_at: string | null;
  country?: Country | null;
}


export interface PriceToResponse {
  data: PriceTo[];
  current_page: number;
  last_page: number;
  per_page: number;
  from: number;
  to: number;
  total: number;
}

export interface GetPriceToParams {
  pagination?: boolean;
  is_active?: boolean;
  page?: number;
  search?: string;
  from_date?: string;
  to_date?: string;
  country_id?: string | null;
}

export async function getPriceTo(
  params?: GetPriceToParams
): Promise<PriceToResponse> {
  const response = await axios.get("/admin/priceto", {
    params: {
      ...params,
      search: params?.search || undefined,
      from_date: params?.from_date,
      to_date: params?.to_date,
      country_id: params?.country_id || undefined,
    },
  });

  if (Array.isArray(response.data)) {
    let filtered = response.data;

    if (params?.search) {
      const keyword = params.search.toLowerCase();
      filtered = filtered.filter((item: PriceTo) =>
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

  return response.data as PriceToResponse;
}
