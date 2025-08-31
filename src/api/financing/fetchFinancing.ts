import { axios } from "@/lib/axios";

export interface RequestFinancingParams {
  country_id?: number;
  pagination?: boolean;
}

export interface FinancingRequest {
  id: number;
  user_id: number;
  amount: number;
  status: string;
  created_at: string;
  updated_at: string;
}

export async function getRequestFinancing(params: RequestFinancingParams = {}): Promise<FinancingRequest[]> {
  const response = await axios.get<FinancingRequest[]>("/admin/request-financing", { params });
  console.log("API response:", response.data);

  return response.data || [];
}