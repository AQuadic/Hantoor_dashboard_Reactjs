import { axios } from "@/lib/axios";

export interface SendMessagePayload {
  conversation_id: number;
  message: string;
  reply_message_id?: number;
  media?: File;
}

export interface MessageResponse {
  id: number;
  conversation_id: number;
  message: string;
  reply_message_id?: number;
  media_url?: string;
  created_at: string;
  updated_at: string;
}

export const sendMessage = async (payload: SendMessagePayload): Promise<MessageResponse> => {
  try {
    const formData = new FormData();
    formData.append("message", payload.message);
    if (payload.reply_message_id !== undefined) {
      formData.append("reply_message_id", payload.reply_message_id.toString());
    }
    if (payload.media) {
      formData.append("media", payload.media);
    }

    const response = await axios.post<MessageResponse>(
      `/admin/support/conversations/${payload.conversation_id}/messages`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          "Accept": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error sending message:", error);
    throw error;
  }
};
