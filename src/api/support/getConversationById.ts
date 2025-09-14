import { axios } from "@/lib/axios";

export interface Userable {
  id: number;
  name: string;
}

export interface MessageImage {
  id: number;
  uuid: string;
  size: number;
  url: string;
  responsive_urls: string[];
}

export interface Message {
  id: number;
  support_conversation_id: number;
  message: string;
  userable_type: string;
  userable_id: number;
  reply_message_id: number | null;
  image: string | MessageImage | null;
  created_at: string;
  updated_at: string;
  userable: Userable;
}

export interface ConversationMessagesResponse {
  current_page: number;
  data: Message[];
  first_page_url: string;
  from: number | null;
  next_page_url: string | null;
  path: string;
  per_page: number | string;
  prev_page_url: string | null;
  to: number | null;
  total?: number;
}

export interface GetConversationMessagesParams {
  conversation_id: number;
  page?: number;
  per_page?: number;
  search?: string;
}

export const getConversationMessages = async ({
  conversation_id,
  page,
  per_page,
  search,
}: GetConversationMessagesParams): Promise<ConversationMessagesResponse> => {
  const response = await axios.get<ConversationMessagesResponse>(
    `/admin/support/conversations/${conversation_id}/messages`,
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      params: {
        ...(page ? { page } : {}),
        ...(per_page ? { per_page } : {}),
        ...(search ? { search } : {}),
      },
    }
  );

  return response.data;
};