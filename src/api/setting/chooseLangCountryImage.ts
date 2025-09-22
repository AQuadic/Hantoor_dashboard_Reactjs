import { axios } from "@/lib/axios";

export interface ChooseLangCountryImageResponse {
  success?: boolean;
  message?: string;
  // server returns image URL in one of several places depending on backend
  // sometimes the endpoint returns a top-level image_url: { image_url: '...' }
  image_url?: string;
  data?: { image?: string; profile_image?: string; image_url?: string } | null;
}

export const chooseLangCountryImage = async (
  params?: Record<string, unknown>
): Promise<ChooseLangCountryImageResponse> => {
  const response = await axios.get<ChooseLangCountryImageResponse>(
    "/admin/setting/choose_lang_country_image",
    {
      params,
    }
  );

  return response.data;
};
