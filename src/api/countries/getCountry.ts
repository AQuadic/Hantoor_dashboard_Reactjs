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
  links: {
    first: string | null;
    last: string | null;
    prev: string | null;
    next: string | null;
  };
  meta: {
    current_page: number;
    current_page_url: string;
    from: number;
    path: string;
    per_page: number;
    to: number;
    last_page?: number;
    total?: number;
  };
}

export interface CountriesParams {
  page?: number;
  per_page?: number;
}

export async function getCountries(params: CountriesParams = {}): Promise<CountriesResponse> {
  const { page = 1, per_page = 10 } = params;
  
  const response = await axios.get<CountriesResponse>("/admin/country", {
    params: {
      page,
      per_page,
    },
  });
  
  return response.data;
}
