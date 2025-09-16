import { axios } from "@/lib/axios";

export interface RequestBody {
  is_active?: boolean;
  order_column?: number;
  country_id?: number;
  title?: {
    ar?: string;
    en: string;
  };
  description?: {
    ar?: string;
    en: string;
  };
}

export const addPage = async (data: RequestBody) => {
  try {
    const response = await axios.post(
      '/admin/pages', 
      data,
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error: any) {
    console.error('API request failed:', error.response || error.message);
    throw error;
  }
};
