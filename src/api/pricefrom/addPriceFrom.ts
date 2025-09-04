import { axios } from "@/lib/axios";

export interface CreatePriceFromPayload {
  name: string;
  country_id?: number;
}

export interface CreatePriceFromResponse {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

export async function createPriceFrom(
  payload: CreatePriceFromPayload
): Promise<CreatePriceFromResponse> {
  const response = await axios.post<CreatePriceFromResponse>(
    "/admin/pricefrom",
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