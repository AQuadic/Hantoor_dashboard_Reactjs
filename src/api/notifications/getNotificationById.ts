import { axios } from "@/lib/axios";

export interface NotificationImage {
  id: number;
  uuid: string;
  size: number;
  url: string;
  responsive_urls: string[];
}

export interface Country {
  id: number;
  name: {
    ar: string;
    en: string;
  };
  code: string;
  currency: string | null;
}

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
  country?: Country; // ✅ هنا
  type: string;
  notifiable_ids: number[];
  created_at: string;
  updated_at: string;
  image: NotificationImage | null; // ✅ هنا
  users: {
    id: number;
    name: string;
    phone: string;
  }[];
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