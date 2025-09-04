import { axios } from "@/lib/axios";

export interface PriceFrom {
  id: number;
  name: string;
  is_active: number;
  created_at: string | null;
  updated_at: string | null;
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
}

export async function getPriceFrom(
  params?: GetPriceFromParams
): Promise<PriceFromResponse> {
  const response = await axios.get("/admin/pricefrom", { params });

  if (Array.isArray(response.data)) {
    return {
      data: response.data,
      current_page: 1,
      last_page: 1,
      per_page: response.data.length,
      from: 1,
      to: response.data.length,
      total: response.data.length,
    };
  }

  return response.data as PriceFromResponse;
}