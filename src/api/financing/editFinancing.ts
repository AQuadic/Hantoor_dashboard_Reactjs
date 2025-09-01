import { axios } from "@/lib/axios";

export interface UpdateRequestFinancingParams {
  id: number; // add this
  phone: string;
  is_active: boolean;
  country_id: number;
  description?: {
    ar: string;
    en: string;
  };
}

export interface UpdateRequestFinancingResponse {
  success?: boolean;   // optional
  status?: boolean;    // some APIs return status
  message?: string;
  data?: {
    id: number;
    country_id: number;
    phone: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
  };
}


export async function updateRequestFinancing(
  params: UpdateRequestFinancingParams
): Promise<UpdateRequestFinancingResponse> {
  const { id, ...body } = params;
  const response = await axios.patch<UpdateRequestFinancingResponse>(
    `/admin/request-financing/${id}`,
    body,
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );
  return response.data;
}
