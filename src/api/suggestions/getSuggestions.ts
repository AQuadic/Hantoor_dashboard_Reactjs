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

export type SuggestionsResponse = Suggestion[];

export interface GetSuggestionsParams {
  page?: number;
  per_page?: number;
  search?: string;
}

export async function getSuggestions(
  params: GetSuggestionsParams = {}
): Promise<SuggestionsResponse> {
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
