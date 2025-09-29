import { axios } from "@/lib/axios";

export interface Conversation {
  id: number;
  user_id: number;
  faq_id: number;
  status: string;
  notes: string;
  is_active: number;
  created_at: string;
  updated_at: string;
  country_id: number | null;
  user: {
    id: number;
    name: string;
    email: string;
    phone: string;
  };

  faq: {
    id: number;
    question: {
      ar: string;
      en: string;
    };
    answer: {
      ar: string;
      en: string;
    };
    type: string;
    is_active: number;
    order_column?: number;
    country_id?: number;
    useful_uses_count?: number;
    unuseful_uses_count?: number;
    created_at: string;
    updated_at: string;
    country?: {
      id: number;
      name: { ar: string; en: string };
      code: string;
      currency: string;
      currency_text: { ar: string; en: string };
      is_active: boolean;
      created_at: string;
      updated_at: string;
    };
  };
}

export interface SupportConversationsResponse {
  data: Conversation[];
  links: any[];
  meta: {
    current_page: number;
    from: number | null;
    last_page: number;
    per_page: number;
    to: number | null;
    total: number;
  };
}

export interface GetSupportConversationsParams {
  country_id?: number;
  with_messages?: boolean;
  per_page?: number;
  page?: number;
  search?: string;
  from_date?: string;
  to_date?: string;
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
