import { axios } from "@/lib/axios";

export interface GeneralSettingsResponse {
  profile_image?: string;
  no_videos: string;
  text_features_ar: string;
  text_features_en: string;
  advanced_search_ar: string;
  advanced_search_en: string;
  financing_text_ar: string;
  financing_text_en: string;
  android_link: string;
  android_version: string;
  publish_date: string;
  iphone_link: string;
  iphone_version: string;
  iphone_date: string;
}

export const getSettings = async (): Promise<GeneralSettingsResponse> => {
  try {
    const response = await axios.get<GeneralSettingsResponse>("/admin/setting", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    return response.data;
  } catch (error: any) {
    console.error("Failed to fetch general settings:", error);
    throw new Error(error?.response?.data?.message || "Failed to fetch general settings");
  }
};
