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
    en: string;
    ar: string;
  };
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
  country?: {
    id: number;
    name: {
      ar: string;
      en: string;
    };
  };
  image?: {
    url?: string;
    responsive_urls?: string[];
  };
  type?: string;
  notifiable_ids?: number[];
  created_at?: string;
  updated_at?: string;
}

export interface BroadcastNotificationsResponse {
  current_page: number;
  data: BroadcastNotification[];
  from: number;
  last_page: number;
  per_page: number;
  to: number;
  total: number;
  first_page_url?: string;
  last_page_url?: string;
  next_page_url?: string | null;
  prev_page_url?: string | null;
  };

export interface BroadcastNotificationsQuery {
  search?: string;
  pagination?: "simple" | "normal" | "none";
  per_page?: number;
  page?: number;
  from_date?: string;
  to_date?: string;  
}

export const getBroadcastNotifications = async (
  params?: BroadcastNotificationsQuery
): Promise<BroadcastNotificationsResponse> => {
  const response = await axios.get<BroadcastNotificationsResponse>(
    "/admin/broadcast_notifications",
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      params,
    }
  );

  return response.data;
};
