import { axios } from "@/lib/axios";

export interface Country {
  id: number;
  name: {
    ar: string;
    en: string;
  };
  code: string;
  currency: {
    ar: string;
    en: string;
  } | null;
  tax: string | null;
  time_type: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface CountriesResponse {
  data: Country[];
}

export async function getCountries(): Promise<Country[]> {
  const response = await axios.get<CountriesResponse>("/admin/country");
  return response.data.data;
}
