import { axios } from "@/lib/axios";

export interface Slider {
  id: number;
  name: string | null;
  ar_image: string | null;
  en_image: string | null;
}

export interface GetSlidersResponse {
  data: Slider[];
}

export interface GetSlidersParams {
  perPage?: number;
  search?: string;
  pagination?: string;
}

export const getSliders = async (params?: GetSlidersParams): Promise<GetSlidersResponse> => {
  const response = await axios.get<GetSlidersResponse>("/admin/setting/sliders", {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    params,
  });
  return response.data;
};
