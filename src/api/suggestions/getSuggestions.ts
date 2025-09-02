import { axios } from "@/lib/axios";

export interface Suggestion {
  id: number;
  title: string;
  description: string;
  created_at: string;
  updated_at?: string;
  name: string;
  phone: string;
  email: string;
  country: string;
  count: number;
}

export interface SuggestionsResponse {
  data: Suggestion[];
  links?: {
    first?: string | null;
    last?: string | null;
    prev?: string | null;
    next?: string | null;
  };
  meta: {
    current_page: number;
    per_page: number;
    total: number;
    last_page: number;
    from: number;
    to: number;
  };
}

export interface GetSuggestionsParams {
  page?: number;
  per_page?: number;
  search?: string;
}

export async function getSuggestions(params: GetSuggestionsParams = {}): Promise<SuggestionsResponse> {
  try {
    const response = await axios.get<SuggestionsResponse>("/admin/suggestions", {
      params, 
      headers: {
        "Content-Type": "application/json", 
        Accept: "application/json",
      },
    });
    return response.data; 
  } catch (error) {
    console.error("Error fetching suggestions:", error);
    throw error;
  }
}
