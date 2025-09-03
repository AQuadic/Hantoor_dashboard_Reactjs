import { axios } from "@/lib/axios";

export interface CreateSliderPayload {
  title: string;
  imageAr: File;
  imageEn: File;
  is_active?: boolean;
}

export interface CreateSliderResponse {
  id: number;
  name: string | null;
  ar_image: string | null;
  en_image: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export const createSlider = async (
  payload: CreateSliderPayload
): Promise<CreateSliderResponse> => {
  const formData = new FormData();
  formData.append("title", payload.title);
  formData.append("image[ar]", payload.imageAr);
  formData.append("image[en]", payload.imageEn);
  if (payload.is_active !== undefined) {
    formData.append("is_active", String(payload.is_active));
  }

  const response = await axios.post<{ data: CreateSliderResponse }>(
    "/admin/setting/sliders",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
      },
    }
  );

  return response.data.data;
};