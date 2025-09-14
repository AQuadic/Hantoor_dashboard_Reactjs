import { axios } from "@/lib/axios";

export interface AppLinkInfo {
  link?: string;
  version?: string;
  release_date?: string;
}

export interface GeneralSettingsResponse {
  site_name?: string;
  site_active?: boolean;
  ads_per_search?: number;
  featuresText?: { en?: string; ar?: string };
  AdvancedSearchText?: { en?: string; ar?: string };
  financeTextForCarDetails?: { ar?: string; en?: string };


  appLinks?: { android?: AppLinkInfo; ios?: AppLinkInfo };
  profile_image?: string;

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
}

export const getSettings = async (): Promise<GeneralSettingsResponse> => {
  try {
    const response = await axios.get<GeneralSettingsResponse>(
      "/admin/setting",
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    return response.data;
  } catch (error: unknown) {
    console.error("Failed to fetch general settings:", error);
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(message || "Failed to fetch general settings");
  }
};
