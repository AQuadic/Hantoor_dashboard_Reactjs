import { axios } from "@/lib/axios";

export interface VehicleBody {
  name: {
    ar: string;
    en: string;
  };
  is_active?: boolean;
}

export interface VehicleBodyResponse {
  success?: boolean;
  message?: string;
  data?: Record<string, unknown>;
}

export const postVehicleBody = async (
  payload: VehicleBody
): Promise<VehicleBodyResponse> => {
  try {
    const response = await axios.post(
      "/admin/vehicle/body",
      {
        ...payload,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    return response.data as VehicleBodyResponse;
  } catch (error) {
    console.error("Failed to add vehicle body:", error);
    return { success: false, message: "Failed to add vehicle body" };
  }
};
