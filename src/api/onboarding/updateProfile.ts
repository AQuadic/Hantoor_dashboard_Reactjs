import { axios } from "@/lib/axios";

export interface UpdateOnboardingPayload {
  image?: File | null;
  country_id?: string;
  title?: {
    ar?: string;
    en?: string;
  };
  description?: {
    ar?: string;
    en?: string;
  };
}

export interface UpdateOnboardingResponse {
  success: boolean;
  message: string;
  data?: any;
}

export async function updateOnboarding(
  id: string,
  data: {
    image?: File | null;
    country_id?: string;
    title?: { ar?: string; en?: string };
    description?: { ar?: string; en?: string };
  }
) {
  const formData = new FormData();

  if (data.image) formData.append("image", data.image);
  if (data.country_id) formData.append("country_id", data.country_id);

  if (data.title) {
    if (data.title.ar) formData.append("title[ar]", data.title.ar);
    if (data.title.en) formData.append("title[en]", data.title.en);
  }

  if (data.description) {
    if (data.description.ar)
      formData.append("description[ar]", data.description.ar);
    if (data.description.en)
      formData.append("description[en]", data.description.en);
  }
  formData.append("_method", "put");

  const response = await axios.post(
    `/admin/setting/onboarding/${id}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
      },
    }
  );

  return response.data;
}
