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
  searchTerm: string = "",
  from_date?: string,
  to_date?: string
): Promise<FinancingResponse> {
  const pageNum = Number(page);

  const params: Record<string, string | number | boolean> = {
    page: pageNum,
    per_page: 15,
    pagination: true,
  };

  if (searchTerm?.trim()) {
    params.search = searchTerm.trim();
  }

  if (from_date) {
    params.from_date = from_date;
  }

  if (to_date) {
    params.to_date = to_date;
  }

  // Use the financing endpoint which returns countries with banks information
  const response = await axios.get("/admin/financing", {
    params,
  });

  // Normalize response shape: some endpoints return pagination metadata at the root
  // while the UI expects { data, links, meta } where meta contains pagination info.
  const raw: any = response.data;

  // If backend already returns the expected shape, return it directly
  if (raw && raw.meta) {
    return raw as FinancingResponse;
  }

  // Map root-level pagination fields into meta to match existing UI expectations
  const mapped: FinancingResponse = {
    data: raw?.data || [],
    links: raw?.links || { first: null, last: null, prev: null, next: null },
    meta: {
      current_page: raw?.current_page ?? 1,
      current_page_url: raw?.first_page_url ?? raw?.current_page_url ?? "",
      from: raw?.from ?? null,
      path: raw?.path ?? "",
      per_page: raw?.per_page ?? raw?.perPage ?? 15,
      to: raw?.to ?? null,
      last_page: raw?.last_page ?? raw?.lastPage ?? undefined,
      total: raw?.total ?? undefined,
    },
  };

  return mapped;
}
