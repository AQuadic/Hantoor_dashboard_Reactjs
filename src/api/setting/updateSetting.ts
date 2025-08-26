import { axios } from "@/lib/axios";

export interface UpdateSettingsPayload {
  no_videos?: string;
  text_features_ar?: string;
  text_features_en?: string;
  advanced_search_ar?: string;
  advanced_search_en?: string;
  financing_text_ar?: string;
  financing_text_en?: string;
  android_link?: string;
  android_version?: string;
  publish_date?: string;
  iphone_link?: string;
  iphone_version?: string;
  iphone_date?: string;
  profile_image?: File | null;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
}

export const updateSettings = async (
  payload: UpdateSettingsPayload
): Promise<ApiResponse> => {
  try {
    const formData = new FormData();

    Object.entries(payload).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (key === "profile_image" && value instanceof File) {
          formData.append(key, value);
        } else {
          formData.append(key, value as string);
        }
      }
    });

    const response = await axios.put<ApiResponse>("admin/setting", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to update settings");
  }
};
