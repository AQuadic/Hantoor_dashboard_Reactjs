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
  name: string;
}

// Type the API response
interface ConversationResponse {
  conversation: Conversation;
}

export const getConversationById = async (id: number): Promise<Conversation> => {
  try {
    const response = await axios.get<ConversationResponse>(`/admin/support/conversations/${id}`, {
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
    });
    return response.data.conversation; // return the inner conversation
  } catch (error) {
    console.error("Error fetching conversation:", error);
    throw error;
  }
};