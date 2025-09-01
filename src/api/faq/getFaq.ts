import { axios } from "@/lib/axios";

export interface FAQ {
  id: number;
  type: "Frequent Questions" | "Technical Support Questions";
  question: {
    ar: string;
    en: string;
  };
  answer: {
    ar: string;
    en: string;
  };
  country_id?: number | null;
  order_column?: number;
  created_at: string;
  updated_at?: string;
}

export interface FAQsResponse {
  data: FAQ[];
  links?: {
    first?: string | null;
    last?: string | null;
    prev?: string | null;
    next?: string | null;
  };
  meta?: {
    current_page: number;
    per_page: number;
    total?: number;
    last_page?: number;
    from?: number;
    to?: number;
  };
}

export interface GetFAQsParams {
  country_id?: number;
  pagination?: "simple" | "normal" | "none";
  page?: number;
}

export async function getFAQs(params: GetFAQsParams = {}): Promise<FAQsResponse> {
  const response = await axios.get<FAQsResponse>("/admin/faqs", {
    params,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  return response.data;
}
