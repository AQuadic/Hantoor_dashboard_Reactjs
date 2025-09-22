import { axios } from "@/lib/axios";
import { CountriesResponse } from "@/api/countries/getCountry";

/**
 * Fetch countries using the `/admin/request-financing` endpoint.
 * Some backends may return pagination meta at the root or inside `meta` —
 * we normalize to the `CountriesResponse` shape used by the UI.
 */
export async function getRequestFinancingCountries(
  page: number = 1,
  searchTerm: string = "",
  from_date?: string,
  to_date?: string
): Promise<CountriesResponse> {
  const pageNum = Number(page);

  const params: Record<string, string | number | boolean> = {
    page: pageNum,
    per_page: 15,
    pagination: true,
  };

  if (searchTerm?.trim()) {
    params.search = searchTerm.trim();
  }

  if (from_date) params.from_date = from_date;
  if (to_date) params.to_date = to_date;

  const resp = await axios.get("/admin/request-financing", {
    params,
  });

  const raw = (resp.data || {}) as Record<string, unknown>;

  // helper to safely read numeric fields that may be strings
  const toNumber = (v: unknown, fallback = 0) =>
    v === undefined || v === null ? fallback : Number(v as unknown as string | number);

  const data = (raw.data as unknown as unknown[]) || [];
  const links = (raw.links as unknown as {
    first: string | null;
    last: string | null;
    prev: string | null;
    next: string | null;
  }) || {
    first: null,
    last: null,
    prev: null,
    next: null,
  };

  const metaSource = (raw.meta as Record<string, unknown>) || raw;

  const meta = {
    current_page: toNumber(metaSource.current_page, pageNum),
    current_page_url:
      (metaSource.current_page_url as string) ||
      (metaSource.first_page_url as string) ||
      "",
    from: toNumber(metaSource.from, 0),
    path: (metaSource.path as string) || "",
    per_page: toNumber(metaSource.per_page, 15),
    to: toNumber(metaSource.to, 0),
    last_page:
      metaSource.last_page !== undefined && metaSource.last_page !== null
        ? toNumber(metaSource.last_page)
        : undefined,
    total:
      metaSource.total !== undefined && metaSource.total !== null
        ? toNumber(metaSource.total)
        : undefined,
  };

  return {
    data,
    links,
    meta,
  } as CountriesResponse;
}
