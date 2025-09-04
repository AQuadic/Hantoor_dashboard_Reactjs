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
  last_page: number;
  per_page: number;
  from: number | null;
  to: number | null;
  total: number;
}

export interface GetSupportConversationsParams {
  country_id?: number;
  with_messages?: boolean;
  per_page?: number;
  page?: number;
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

  console.log("Request URL:", response.config.url, "Params:", params);
  console.log("Response:", response.data);

  return response.data as SupportConversationsResponse;
}