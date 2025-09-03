import { axios } from "@/lib/axios";

export interface PageDetail {
  id: number;
  title: {
    ar?: string;
    en: string;
  };
  description?: {
    ar?: string;
    en: string;
  };
  is_active: boolean;
  order_column?: number;
  country_id?: number;
  image?: string | null;
  created_at: string;
  updated_at?: string;
}

export interface PageResponse {
  data: PageDetail;
}

export async function getPage(id: string | number): Promise<PageResponse> {
  const response = await axios.get<PageResponse>(`/admin/pages/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  return response.data;
}
