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

/**
 * Raw API response shape (matches the API payload exactly).
 * Note: some numeric values may be returned as strings (eg. per_page).
 */
export interface ApiCountriesResponse {
  data: Country[];
  links: {
    first: string | null;
    last: string | null;
    prev: string | null;
    next: string | null;
  };
  meta: {
    current_page: number | string;
    current_page_url: string;
    from: number | string;
    path: string;
    per_page: number | string;
    to: number | string;
    last_page?: number | string | null;
    total?: number | string | null;
  };
}

/**
 * Normalized response used by the frontend code: numeric pagination fields are converted to numbers.
 */
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
    last_page?: number | null;
    total?: number | null;
  };
}

export async function getCountries(
  page: number = 1,
  searchTerm: string = "",
  from_date?: string,
  to_date?: string
): Promise<CountriesResponse> {
  const pageNum = Number(page);

  const params: Record<string, string | number> = {
    page: pageNum,
  };

  if (searchTerm && searchTerm.trim()) {
    params.search = searchTerm.trim();
  }

  if (from_date) {
    params.from_date = from_date;
  }

  if (to_date) {
    params.to_date = to_date;
  }

  // Fetch raw API response
  const response = await axios.get<ApiCountriesResponse>("/admin/country", {
    params,
  });

  const apiData = response.data;

  // Normalize numeric meta fields which may come back as strings from the API
  const meta = {
    current_page: Number(apiData.meta.current_page ?? pageNum),
    current_page_url: apiData.meta.current_page_url,
    from: Number(apiData.meta.from ?? 0),
    path: apiData.meta.path,
    per_page: Number(apiData.meta.per_page ?? 15),
    to: Number(apiData.meta.to ?? 0),
    last_page:
      apiData.meta.last_page !== undefined && apiData.meta.last_page !== null
        ? Number(apiData.meta.last_page)
        : undefined,
    total:
      apiData.meta.total !== undefined && apiData.meta.total !== null
        ? Number(apiData.meta.total)
        : undefined,
  };

  return {
    data: apiData.data,
    links: apiData.links,
    meta,
  };
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
