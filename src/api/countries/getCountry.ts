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

export async function getCountries(page: number = 1, searchTerm: string = ""): Promise<CountriesResponse> {
  const pageNum = Number(page);
  
  const params: any = {
    page: pageNum,
    per_page: 15,
  };
  
  if (searchTerm && searchTerm.trim()) {
    params.search = searchTerm.trim();
  }
  
  const response = await axios.get<CountriesResponse>("/admin/country", {
    params,
  });
  
  return response.data;
}
