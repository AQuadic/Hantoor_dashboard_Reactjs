import { axios } from "@/lib/axios";

// Define the structure of a single message
export interface Message {
  id: number;
  conversation_id: number;
  sender: string;
  content: string;
  created_at: string;
}

// Define the structure of the conversation response
export interface ConversationResponse {
  id: number;
  vehicle_id: number;
  is_active: boolean;
  is_followed: boolean;
  created_at: string;
  messages: Message[];
}

// API function to fetch a conversation by ID
export const getConversationById = async (
  conversationId: number
): Promise<ConversationResponse> => {
  const response = await axios.get(`/admin/vehicle/conversation/${conversationId}`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  return response.data as ConversationResponse;
};
