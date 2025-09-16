import { axios } from "@/lib/axios";

export interface User {
  id: number;
  name: string;
  email: string;
  image: string | null;
  created_at?: string | null;
}

export interface ReplyMessage {
  id: number;
  message: string;
}

export interface Message {
  id: number;
  conversation_id: number;
  message: string;
  created_at: string;
  reply_message: ReplyMessage | null;
  user: User | null;
}

export interface Vehicle {
  id: number;
  image: string | null;
  name: { ar: string; en: string };
}

export interface Conversation {
  id: number;
  is_active: number; 
  is_followed: boolean;
  followers_count: number | null;
  created_at: string;
  vehicle_id: number;
  vehicle: Vehicle;
  messages: Message[];
}

export interface ConversationApiResponse {
  conversation: Conversation;
}

export const fetchConversation = async (
  id: number
): Promise<ConversationApiResponse> => {
  const response = await axios.get(`/admin/vehicle/conversation/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  return response.data as ConversationApiResponse;
};
