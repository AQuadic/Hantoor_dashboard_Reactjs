import { axios } from "@/lib/axios";

export interface UpdatePriceFromResponse {
  success: boolean;
  message: string;
  data?: {
    id: number;
    name: string;
    is_active: number;
    created_at: string | null;
    updated_at: string | null;
  };
}

export interface UpdatePriceFromPayload {
  name?: string;
  is_active?: number;
}

export async function updatePriceFrom(
  price_id: number,
  payload: UpdatePriceFromPayload
): Promise<UpdatePriceFromResponse> {
  const response = await axios.post<UpdatePriceFromResponse>(
    `/admin/pricefrom/${price_id}`,
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
