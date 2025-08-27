import { axios } from "@/lib/axios";

export interface FinancingCountry {
  id: number;
  name: {
    ar: string;
    en: string;
  };
  code: string;
  currency: string;
  currency_text: {
    ar: string;
    en: string;
  } | null;
  language_code: string;
  service_fee: number | null;
  service_duration_type: string | null;
  service_duration: string | null;
  is_active: boolean;
  banks_count: number;
  users_count: number;
  created_at: string;
  updated_at?: string;
}

export interface FinancingResponse {
  data: FinancingCountry[];
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

export async function getFinancingCountries(
  page: number = 1,
  searchTerm: string = ""
): Promise<FinancingResponse> {
  const pageNum = Number(page);

  const params: Record<string, string | number> = {
    page: pageNum,
    per_page: 15,
  };

  if (searchTerm && searchTerm.trim()) {
    params.search = searchTerm.trim();
  }

  const response = await axios.get<FinancingResponse>("/admin/country", {
    params,
  });

  return response.data;
}
