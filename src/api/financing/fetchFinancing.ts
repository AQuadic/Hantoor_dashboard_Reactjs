import { axios } from "@/lib/axios";

export interface FinancingItem {
  id: number;
  phone: string;
  country_id: number;
  is_active: number | boolean;
  created_at: string;
  updated_at: string;
}

export async function getRequestFinancing(
  country_id?: number,
  pagination: boolean = false
): Promise<FinancingItem[]> {
  const response = await axios.get<FinancingItem[]>(
    "/admin/request-financing",
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      params: {
        ...(country_id ? { country_id } : {}),
        pagination,
      },
    }
  );

  return response.data;
}