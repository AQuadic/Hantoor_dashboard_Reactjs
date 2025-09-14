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
  AdvancedSearchText?: LocalizedText;
  financeTextForCarDetails?: LocalizedText;
  appLinks?: AppSettings;
}

export interface UpdateSettingsResponse {
  success?: boolean;
  message?: string;
  data?: unknown;
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
  } catch (error: unknown) {
    console.error("Error updating settings:", error);
    throw error;
  }
}
