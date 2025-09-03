import { axios } from "@/lib/axios";


export interface BroadcastNotificationPayload {
  title: Record<string, string>;
  body: Record<string, string>;
  type: "all" | "selected";
  notifiable_ids?: string[];
  country_id: number;
  image?: File;   
}

export const sendBroadcastNotification = async (
  payload: BroadcastNotificationPayload
) => {
  try {
    const formData = new FormData();

    // Append each language field separately
    Object.entries(payload.title).forEach(([locale, value]) => {
      formData.append(`title[${locale}]`, value);
    });
    Object.entries(payload.body).forEach(([locale, value]) => {
      formData.append(`body[${locale}]`, value);
    });

    formData.append("type", payload.type);
    formData.append("country_id", payload.country_id.toString());

    if (payload.type === "selected" && payload.notifiable_ids) {
      payload.notifiable_ids.forEach((id) => formData.append("notifiable_ids[]", id));
    }

    if (payload.image) {
      formData.append("image", payload.image);
    }

    const response = await axios.post("/admin/broadcast_notifications", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
      },
    });

    return response.data;
  } catch (error: any) {
    console.error("Failed to send broadcast notification:", error.response || error);
    throw error;
  }
};
