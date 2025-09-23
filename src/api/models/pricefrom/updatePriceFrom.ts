import { axios } from "@/lib/axios";

export interface CountryName {
  ar: string;
  en: string;
}

export interface Country {
  id: number;
  name: CountryName;
}

export interface PriceFrom {
  id: number;
  name: string;
  is_active: number;
  created_at: string | null;
  updated_at: string | null;
  country?: Country; 
}

export interface UpdatePriceFromResponse {
  success: boolean;
  message: string;
  data?: PriceFrom;
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
