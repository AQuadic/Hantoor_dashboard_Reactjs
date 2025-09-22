import { axios } from "@/lib/axios";

export interface UploadLangCountryImageResponse {
  success?: boolean;
  message?: string;
  data?: { url?: string };
}

/**
 * Upload a single image to the admin setting upload endpoint shown in the backend routes.
 * Endpoint: POST /admin/setting/upload_lang_country_image
 */
export const uploadLangCountryImage = async (
  image: File
): Promise<UploadLangCountryImageResponse> => {
  const formData = new FormData();
  formData.append("image", image);

  const response = await axios.post<UploadLangCountryImageResponse>(
    "/admin/setting/upload_lang_country_image",
    formData,
    {
      headers: {
        // Let browser/axios set multipart boundary
        Accept: "application/json",
      },
    }
  );

  return response.data;
};
