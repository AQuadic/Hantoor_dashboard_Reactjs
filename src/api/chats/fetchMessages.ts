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
  return response.data as MessagesApiResponse;
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
