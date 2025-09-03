import { axios } from "@/lib/axios";

export interface GetPagesParams {
  search?: string;
  pagination?: "simple" | "normal" | "none";
  per_page?: number;
}

export interface Page {
  id: number;
  title: {
    ar?: string;
    en: string;
  };
  description?: {
    ar?: string;
    en: string;
  };
  is_active: boolean;
  order_column?: number;
  country_id?: number;
  created_at: string;
  updated_at?: string;
}

export interface PagesResponse {
  data: Page[];
  links: {
    first: string | null;
    last: string | null;
    prev: string | null;
    next: string | null;
  };
  meta: {
    current_page: number;
    per_page: number;
    from: number;
    to: number;
    last_page?: number;
    total?: number;
    path: string;
  };
}

export const getPages = async (params?: GetPagesParams): Promise<PagesResponse> => {
  const response = await axios.get<PagesResponse>("/admin/pages", {
    params,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  return response.data;
};
