import { axios } from "@/lib/axios";

export interface FinancingCountry {
  id: number;
  name: {
    ar: string;
    en: string;
  };
  code: string;
  currency: string | null;
  currency_text: {
    ar: string;
    en: string;
  } | null;
  language_code: string | null;
  service_fee: number | null;
  service_duration_type: string | null;
  service_duration: string | null;
  is_active: boolean;
  banks_count: number;
  users_count?: number;
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
    from: number | null;
    path: string;
    per_page: number;
    to: number | null;
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
  const perPage = 15;

  const params: Record<string, string | number | boolean> = {
    page,
    per_page: perPage,
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

  const response = await axios.get("/admin/financing", { params });
  const raw: any = response.data;

  if (Array.isArray(raw)) {
    const total = raw.length;
    const from = total > 0 ? (page - 1) * perPage + 1 : 0;
    const to = from + total - 1;

    return {
      data: raw,
      links: { first: null, last: null, prev: null, next: null },
      meta: {
        current_page: page,
        current_page_url: "",
        from,
        path: "/admin/financing",
        per_page: perPage,
        to,
        last_page: Math.ceil(total / perPage),
        total,
      },
    };
  }

  if (raw?.meta && raw?.data) {
    return raw as FinancingResponse;
  }

  return {
    data: raw?.data || [],
    links: raw?.links || { first: null, last: null, prev: null, next: null },
    meta: {
      current_page: raw?.current_page ?? page,
      current_page_url: raw?.first_page_url ?? "",
      from: raw?.from ?? 0,
      path: raw?.path ?? "/admin/financing",
      per_page: raw?.per_page ?? perPage,
      to: raw?.to ?? 0,
      last_page: raw?.last_page ?? 1,
      total: raw?.total ?? raw?.data?.length ?? 0,
    },
  };
}
