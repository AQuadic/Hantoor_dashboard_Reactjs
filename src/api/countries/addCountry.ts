import { axios } from "@/lib/axios";

export interface CountryPayload {
  name: { ar: string; en: string };
  code: string;
  currency_text?: { ar: string; en: string };
  currency_code?: string;
  service_fee?: string; 
  service_duration_type?: "day" | "month" | "year";
  service_duration?: string;
  is_active?: boolean;
}


export interface CountryResponse {
  id: number;
  name: {
    ar: string;
    en: string;
  };
  code: string;
  currency_text: {
    ar: string;
    en: string;
  } | null;
  tax: string | null;
  time_type: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export async function storeCountry(
  data: CountryPayload
): Promise<CountryResponse> {
  const response = await axios.post<CountryResponse>("/admin/country", data);
  return response.data;
}