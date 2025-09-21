import { axios } from "@/lib/axios";

export interface Slider {
  id: number;
  name: string | null;
  ar_image: {
    file_name: string;
    mime_type: string;
    url: string;
    responsive_urls: string[];
    uuid: string;
  } | null;
  en_image: {
    file_name: string;
    mime_type: string;
    url: string;
    responsive_urls: string[];
    uuid: string;
  } | null;
}

export interface GetSlidersResponse {
  data: Slider[];
}

export interface GetSlidersParams {
  perPage?: number;
  search?: string;
  pagination?: string;
  country_id?: number;
}

export const getSliders = async (
  params?: GetSlidersParams
): Promise<GetSlidersResponse> => {
  const response = await axios.get<GetSlidersResponse>(
    "/admin/setting/sliders",
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
