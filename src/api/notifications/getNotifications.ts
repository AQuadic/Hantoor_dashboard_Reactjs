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
  data: BroadcastNotification[];
  meta: {
    current_page: number;
    from: number;
    to: number;
    per_page: number;
    total: number;
    last_page: number;
  };
}


export interface BroadcastNotificationsQuery {
  search?: string;
  pagination?: "simple" | "normal" | "none";
  per_page?: number;
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
