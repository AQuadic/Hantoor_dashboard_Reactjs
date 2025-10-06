import { axios } from "@/lib/axios";

export interface RemoveLangCountryImageResponse {
  success?: boolean;
  message?: string;
  data?: unknown;
}

export async function removeLangCountryImage(): Promise<RemoveLangCountryImageResponse> {
  const response = await axios.post<RemoveLangCountryImageResponse>(
    "/admin/setting/choose_lang_country_image",
    { remove_image: true }
  );
  return response.data;
}
