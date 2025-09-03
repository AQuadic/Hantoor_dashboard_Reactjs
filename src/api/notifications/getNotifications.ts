import { axios } from "@/lib/axios";

export interface BroadcastNotification {
  id: number;
  title: {
    en: string;
    ar: string;
  };
  body: {
    en: string;
    ar: string;
  };
  type: "all" | "selected";
  country_id: number;
  notifiable_ids?: string[];
  image?: string;
  created_at: string;
  updated_at: string;
}

export interface BroadcastNotificationsResponse {
  data: BroadcastNotification[];
  current_page?: number;
  per_page?: number;
  total?: number;
  last_page?: number;
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