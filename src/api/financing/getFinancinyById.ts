// services/requestFinancing.ts
import { axios } from "@/lib/axios"; // adjust the path to where your axios instance is

export interface RequestFinancingResponse {
  id: number;
  country_id: number;
  phone: string;
  is_active: number;
  created_at: string;
  updated_at: string;
}


export const getRequestFinancingById = async (
  id: number
): Promise<RequestFinancingResponse | null> => {
  try {
    const response = await axios.get<RequestFinancingResponse>(
      `/admin/request-financing/${id}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching request financing by ID:", error);
    return null;
  }
};