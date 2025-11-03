import { axios } from "@/lib/axios";

export interface FinancingItem {
  id: number;
  phone: string;
  country_id: number;
  is_active: number | boolean;
  created_at: string;
  updated_at: string;
}
export interface FinancingApiResponse {
  current_page: number;
  data: FinancingItem[];
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

export async function getRequestFinancing(
  page: number = 1,
  country_id?: number,
  isPaginated: boolean = true
): Promise<FinancingApiResponse | FinancingItem[]> {
  const params: Record<string, string | number | boolean> = {};

  if (isPaginated) {
    params.page = page;
  } else {
    params.pagination = false;
  }

  if (country_id) params.country_id = country_id;

  const response = await axios.get<FinancingApiResponse | FinancingItem[]>(
    "/admin/request-financing",
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      params,
    }
  );

  // When pagination=false, API returns array directly
  if (Array.isArray(response.data)) {
    return response.data;
  }

  return response.data;
}
