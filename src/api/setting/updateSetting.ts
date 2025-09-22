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
  // support uploading or removing profile image
  profile_image?: File | null;
  remove_image?: boolean;
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
    const hasFile = payload.profile_image instanceof File;

    if (hasFile) {
      const formData = new FormData();
      if (payload.site_name !== undefined)
        formData.append("site_name", String(payload.site_name));
      if (payload.site_active !== undefined)
        formData.append("site_active", payload.site_active ? "1" : "0");
      if (payload.ads_per_search !== undefined)
        formData.append("ads_per_search", String(payload.ads_per_search));

      if (payload.featuresText) {
        if (payload.featuresText.ar !== undefined)
          formData.append("featuresText[ar]", payload.featuresText.ar);
        if (payload.featuresText.en !== undefined)
          formData.append("featuresText[en]", payload.featuresText.en);
      }

      if (payload.AdvancedSearchText) {
        if (payload.AdvancedSearchText.ar !== undefined)
          formData.append(
            "AdvancedSearchText[ar]",
            payload.AdvancedSearchText.ar
          );
        if (payload.AdvancedSearchText.en !== undefined)
          formData.append(
            "AdvancedSearchText[en]",
            payload.AdvancedSearchText.en
          );
      }

      if (payload.financeTextForCarDetails) {
        if (payload.financeTextForCarDetails.ar !== undefined)
          formData.append(
            "financeTextForCarDetails[ar]",
            payload.financeTextForCarDetails.ar
          );
        if (payload.financeTextForCarDetails.en !== undefined)
          formData.append(
            "financeTextForCarDetails[en]",
            payload.financeTextForCarDetails.en
          );
      }

      if (payload.appLinks) {
        if (payload.appLinks.android) {
          if (payload.appLinks.android.link !== undefined)
            formData.append(
              "appLinks[android][link]",
              payload.appLinks.android.link
            );
          if (payload.appLinks.android.version !== undefined)
            formData.append(
              "appLinks[android][version]",
              payload.appLinks.android.version
            );
          if (payload.appLinks.android.release_date !== undefined)
            formData.append(
              "appLinks[android][release_date]",
              payload.appLinks.android.release_date
            );
        }
        if (payload.appLinks.ios) {
          if (payload.appLinks.ios.link !== undefined)
            formData.append("appLinks[ios][link]", payload.appLinks.ios.link);
          if (payload.appLinks.ios.version !== undefined)
            formData.append(
              "appLinks[ios][version]",
              payload.appLinks.ios.version
            );
          if (payload.appLinks.ios.release_date !== undefined)
            formData.append(
              "appLinks[ios][release_date]",
              payload.appLinks.ios.release_date
            );
        }
      }

      // append profile image file
      if (payload.profile_image)
        formData.append("profile_image", payload.profile_image);

      // support explicit remove flag
      if (payload.remove_image !== undefined)
        formData.append("remove_image", payload.remove_image ? "1" : "0");

      // Use PUT with FormData; let axios/browser set Content-Type with boundary
      const response = await axios.put<UpdateSettingsResponse>(
        "/admin/setting",
        formData
      );

      return response.data;
    }

    // No file path: send JSON body via PUT
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
