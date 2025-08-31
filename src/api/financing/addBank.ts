import { axios } from "@/lib/axios";

export interface CreateRequestFinancingParams {
  phone: string;     
  country_id: number;  
  is_active?: boolean;
  name: { ar: string; en: string };
}

export interface CreateRequestFinancingResponse {
  success: boolean;
  message: string;
  data?: any; 
}

export async function createRequestFinancing(
  params: CreateRequestFinancingParams
): Promise<CreateRequestFinancingResponse> {
  if (params.phone.length > 20) {
    throw new Error("Phone must not be greater than 20 characters.");
  }

  const response = await axios.post<CreateRequestFinancingResponse>(
    "/admin/request-financing",
    params,
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );

  return response.data;
}
