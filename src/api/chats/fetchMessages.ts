import { axios } from "@/lib/axios";

export interface Message {
  id: number;
  conversation_id: number;
  sender_type: "user" | "admin";
  message: string;
  created_at: string;
  updated_at: string;
}

export interface MessagesApiResponse {
  data: Message[];
  current_page: number;
  from: number;
  last_page: number;
  per_page: number;
  to: number;
  total: number;
}

export const fetchMessages = async (
  conversationId: number,
  page: number = 1,
  perPage: number = 20
): Promise<MessagesApiResponse> => {
  const response = await axios.get(`/admin/vehicle/conversation/messages`, {
    params: {
      conversation_id: conversationId,
      page,
      per_page: perPage,
    },
  });
  type RawMessagesResponse = {
    data?: unknown;
    meta?: {
      current_page?: number;
      from?: number | null;
      last_page?: number;
      per_page?: number;
      to?: number | null;
      total?: number;
    };
  };

  const raw = response.data as RawMessagesResponse;

  // Some endpoints return pagination data under `meta` and `links`.
  // Normalize to our MessagesApiResponse shape.
  const data: Message[] = Array.isArray(raw.data)
    ? (raw.data as Message[])
    : [];
  type Meta = {
    current_page?: number;
    from?: number | null;
    last_page?: number;
    per_page?: number;
    to?: number | null;
    total?: number;
  };

  const metaRaw = (raw.meta as Meta) || (response.data as Meta);

  return {
    data,
    current_page: metaRaw?.current_page || 1,
    from: metaRaw?.from ?? 0,
    last_page: metaRaw?.last_page || 1,
    per_page: metaRaw?.per_page || perPage,
    to: metaRaw?.to ?? 0,
    total: metaRaw?.total || 0,
  } as MessagesApiResponse;
};

export const deleteMessage = async (messageId: number): Promise<void> => {
  await axios.delete(`/admin/vehicle/conversation/messages/${messageId}`);
};

export const toggleConversationStatus = async (
  conversationId: number,
  isActive: boolean
): Promise<void> => {
  await axios.patch(`/admin/vehicle/conversation/${conversationId}`, {
    is_active: isActive ? 1 : 0,
  });
};
