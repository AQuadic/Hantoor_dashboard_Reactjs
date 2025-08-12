import { axios } from "@/lib/axios";

/**
 * Payload for posting a new brand
 * @property name - Brand name in Arabic and English
 * @property is_active - Whether the brand is active (default: true)
 * @property image - Optional brand image file
 */
export interface PostBrandPayload {
  name: {
    ar: string;
    en: string;
  };
  is_active?: boolean; // Add this to the interface
  image?: File | null;
}

export interface PostBrandResponse {
  success?: boolean;
  message?: string;
  data?: Record<string, unknown>;
}

export async function postBrand(
  payload: PostBrandPayload
): Promise<PostBrandResponse> {
  const formData = new FormData();
  formData.append("name[ar]", payload.name.ar);
  formData.append("name[en]", payload.name.en);

  // Many PHP/Laravel APIs expect "1"/"0" for booleans in FormData
  const isActive = payload.is_active ?? true;
  formData.append("is_active", isActive ? "1" : "0");

  if (payload.image) {
    formData.append("image", payload.image);
  }

  const response = await axios.post("/admin/brands", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Accept: "application/json",
    },
  });

  return response.data as PostBrandResponse;
}
