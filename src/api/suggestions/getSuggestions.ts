import { axios } from "@/lib/axios";

export interface Suggestion {
  id: number;
  title: string;
  message: string;
  created_at: string;
  updated_at?: string;
  name: string;
  phone: string;
  email: string;
  city: string;
  status: string;
  type: string;
}

export interface SuggestionsResponse {
  data: Suggestion[];
  meta: {
    total: number;
    per_page: number;
    from: number;
    to: number;
    last_page: number;
  };
}

export interface GetSuggestionsParams {
  page?: number;
  per_page?: number;
  search?: string;
}

export async function getSuggestions(
  params: GetSuggestionsParams = {}
): Promise<SuggestionsResponse> {
  try {
    const response = await axios.get<Suggestion[]>("/admin/suggestions", {
      params,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    const items = response.data;
    const total = items.length;
    const perPage = params.per_page || 10;
    const page = params.page || 1;

    return {
      data: items,
      meta: {
        total,
        per_page: perPage,
        from: (page - 1) * perPage + 1,
        to: (page - 1) * perPage + items.length,
        last_page: Math.ceil(total / perPage),
      },
    };
  } catch (error) {
    console.error("Error fetching suggestions:", error);
    throw error;
  }
}
