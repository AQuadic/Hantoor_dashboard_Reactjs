import { axios } from "@/lib/axios";

export interface UpdateConversationBody {
  is_active?: boolean;
  status?: string;
  notes?: string;
}

export const updateConversation = async (
  id: number,
  body: UpdateConversationBody
) => {
  try {
    const response = await axios.post(
      `/admin/support/conversations/${id}`,
      body,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    return response.data;
  } catch (error: any) {
    console.error("Error updating conversation:", error.response?.data || error);
    throw error;
  }
};