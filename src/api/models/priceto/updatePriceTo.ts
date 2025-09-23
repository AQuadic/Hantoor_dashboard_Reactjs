import { axios } from "@/lib/axios";

export interface UpdatePriceToResponse {
  success: boolean;
  message: string;
  data?: {
    id: number;
    name: string;
    country_id?: number;
    is_active: number;
    created_at: string | null;
    updated_at: string | null;
  };
}

export interface UpdatePriceToPayload {
  name?: string;
  country_id?: number;
  is_active?: number;
}

export async function updatePriceTo(
  price_id: number,
  payload: UpdatePriceToPayload
): Promise<UpdatePriceToResponse> {
  const response = await axios.post<UpdatePriceToResponse>(
    `/admin/priceto/${price_id}`,
    payload,
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );
  return response.data;
}
