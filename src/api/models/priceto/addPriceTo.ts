import { axios } from "@/lib/axios";

export interface CreatePriceToPayload {
  name: string;
  country_id?: number;
}

export interface CreatePriceToResponse {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

export async function createPriceTo(
  payload: CreatePriceToPayload
): Promise<CreatePriceToResponse> {
  const response = await axios.post<CreatePriceToResponse>(
    "/admin/priceto",
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