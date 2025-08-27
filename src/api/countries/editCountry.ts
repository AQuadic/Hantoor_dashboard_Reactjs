import { axios } from "@/lib/axios";

export interface CountryPayload {
  name?: {
    ar: string;
    en: string;
  };
  code?: string;
  currency?: string;
  service_fee?: string;
  service_duration?: string;
  service_duration_type?: "day" | "month" | "year";
  is_active?: boolean;
}

export interface CountryResponse {
  id: number;
  name: {
    ar: string;
    en: string;
  };
  code: string;
  currency?: string;
  currency_text?: { ar: string; en: string };
  service_fee: number | null;
  service_duration: string | null;
  service_duration_type: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export async function updateCountry(
  id: number,
  data: CountryPayload
): Promise<CountryResponse> {
  const response = await axios.post<CountryResponse>(
    `/admin/country/${id}`,
    data
  );
  return response.data;
}
