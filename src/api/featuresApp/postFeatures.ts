import { axios } from "@/lib/axios";

export interface FeatureAppBody {
  description: {
    ar: string;
    en: string;
  };
  is_active?: boolean | number;
  image?: File | null;
}

export interface FeatureAppResponse {
  success: boolean;
  message: string;
  data?: unknown;
}

export const createFeatureApp = async (
  body: FeatureAppBody
): Promise<FeatureAppResponse> => {
  try {
    const formData = new FormData();
    if (body.description) {
      if (body.description.ar)
        formData.append("description[ar]", body.description.ar);
      if (body.description.en)
        formData.append("description[en]", body.description.en);
    }
    if (typeof body.is_active !== "undefined") {
      if (typeof body.is_active === "boolean")
        formData.append("is_active", body.is_active ? "1" : "0");
      else formData.append("is_active", String(body.is_active));
    }
    if (body.image) formData.append("image", body.image);

    const response = await axios.post<FeatureAppResponse>(
      "/admin/vehicle/feature-app",
      formData,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error: unknown) {
    // safe logging
    try {
      const e = error as { response?: { data?: unknown }; message?: string };
      console.error(
        "Error creating feature app:",
        e.response?.data || e.message
      );
    } catch (e) {
      console.error("Error creating feature app:", e);
    }
    throw error;
  }
};
