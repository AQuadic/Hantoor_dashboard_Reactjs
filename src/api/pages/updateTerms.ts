import { axios } from "@/lib/axios";

export interface UpdatePageRequestBody {
  is_active?: boolean;
  order_column?: number;
  title?: {
    ar?: string;
    en?: string;
  };
  description?: {
    ar?: string;
    en?: string;
  };
}

export interface UpdatePageResponse {
  data: {
    id: number;
    title: { ar?: string; en: string };
    description: { ar?: string; en: string };
    is_active: boolean;
    order_column: number;
    created_at: string;
    updated_at: string;
    image?: string | null;
    country_id?: number;
  };
}

export const updatePage = async (
  id: string | number,
  body: UpdatePageRequestBody
): Promise<UpdatePageResponse> => {
  const response = await axios.post<UpdatePageResponse>(
    `/admin/pages/${id}`,
    body,
    {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    }
  );
  return response.data;
};