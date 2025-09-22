import { axios } from "@/lib/axios";

export interface UserImage {
  file_name: string;
  url: string;
  mime_type: string;
  responsive_urls: string[];
  uuid: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  image: UserImage | null;
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

export interface VehicleImage {
  id: number;
  uuid: string;
  url: string;
  responsive_urls: string[];
  size: number;
  name: { ar: string; en: string };
  vehicle_id: number;
}

export interface Vehicle {
  id: number;
  image: VehicleImage | null;
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
