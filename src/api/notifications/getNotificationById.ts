import { axios } from "@/lib/axios";

export interface BroadcastNotification {
  id: number;
  title: {
    ar: string;
    en: string;
  };
  body: {
    ar: string;
    en: string;
  };
  country_id: number;
  type: string;
  notifiable_ids: number[];
  created_at: string;
  updated_at: string;
  image: string | null;
  users: any[];
}

export const getBroadcastNotification = async (
  broadcast_notification: string
): Promise<BroadcastNotification> => {
  const response = await axios.get<BroadcastNotification>(
    `/admin/broadcast_notifications/${broadcast_notification}`,
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );
  return response.data;
};