import { axios } from "@/lib/axios";

export interface Country {
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

export async function getCountries(
  page: number = 1,
  searchTerm: string = ""
): Promise<CountriesResponse> {
  const pageNum = Number(page);

  const params: Record<string, string | number> = {
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

/**
 * Fetch all countries by following pagination until there is no next link.
 * Returns a flat array of Country objects.
 */
export async function getAllCountries(
  searchTerm: string = ""
): Promise<Country[]> {
  const all: Country[] = [];
  let page = 1;

  while (true) {
    const resp = await getCountries(page, searchTerm);
    all.push(...resp.data);
    if (!resp.links?.next) break;
    page++;
    // defensive: if last_page is present, stop when page exceeds it
    if (resp.meta?.last_page && page > resp.meta.last_page) break;
  }

  return all;
}
