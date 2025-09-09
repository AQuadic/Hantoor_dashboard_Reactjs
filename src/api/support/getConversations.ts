import { axios } from "@/lib/axios";

export interface Conversation {
  id: number;
  title: string;
  country_id: number | null;
  created_at: string;
  updated_at: string;
  phone: string;
  name:string;
  notes: string
  is_active: number
}

export interface SupportConversationsResponse {
  data: Conversation[];
  current_page: number;
  from: number | null;
  to: number | null;
  per_page: string;
  first_page_url: string;
  next_page_url: string | null;
  prev_page_url: string | null;
  path: string;
  current_page_url: string;
}

export interface GetSupportConversationsParams {
  country_id?: number;
  with_messages?: boolean;
  per_page?: number;
  page?: number;
  search?: string;
}

export async function getSupportConversations(
  params?: GetSupportConversationsParams
): Promise<SupportConversationsResponse> {
  const response = await axios.get("/admin/support/conversations", {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    params,
  });

  return response.data as SupportConversationsResponse;
}