import { axios } from "@/lib/axios";
export interface LocalizedText {
  en?: string;
  ar?: string;
}

export interface AppInfo {
  link?: string;
  version?: string;
  release_date?: string;
}

export interface AppSettings {
  ios?: AppInfo;
  android?: AppInfo;
}

export interface UpdateSettingsPayload {
  site_name?: string;
  site_active?: boolean;
  ads_per_search?: number;
  featuresText?: LocalizedText;
  AdvancedSearch?: LocalizedText;
  financeText?: LocalizedText;
  app?: AppSettings;
}

export interface UpdateSettingsResponse {
  success?: boolean;
  message?: string;
  data?: any; 
}

export async function updateSettings(
  payload: UpdateSettingsPayload
): Promise<UpdateSettingsResponse> {
  try {
    const response = await axios.put<UpdateSettingsResponse>(
      "/admin/setting",
      payload,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    return response.data;
  } catch (error: any) {
    console.error("Error updating settings:", error.response?.data || error.message);
    throw error;
  }
}
