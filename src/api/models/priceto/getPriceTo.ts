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
  pagination?: boolean | string;
  is_active?: boolean;
  page?: number;
  per_page?: number;
  search?: string;
  from_date?: string;
  to_date?: string;
  country_id?: string | null;
}

export async function getPriceTo(
  params?: GetPriceToParams
): Promise<PriceToResponse> {
  const queryParams: Record<string, unknown> = {};

  // Send pagination parameter based on the value
  if (params?.pagination === false) {
    queryParams.pagination = false;
  } else if (params?.pagination === "normal" || params?.pagination === true) {
    queryParams.pagination = "normal";
  }

  // Add other parameters
  if (params?.page) queryParams.page = params.page;
  if (params?.per_page) queryParams.per_page = params.per_page;
  if (params?.search) queryParams.search = params.search;
  if (params?.country_id) queryParams.country_id = params.country_id;
  if (params?.from_date) queryParams.from_date = params.from_date;
  if (params?.to_date) queryParams.to_date = params.to_date;
  if (params?.is_active !== undefined) queryParams.is_active = params.is_active;

  const response = await axios.get("/admin/priceto", {
    params: queryParams,
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
