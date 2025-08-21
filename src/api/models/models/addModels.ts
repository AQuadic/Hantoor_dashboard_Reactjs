import { axios } from "@/lib/axios";

export interface VehicleModel {
  name: {
    ar: string;
    en: string;
  };
  is_active?: boolean;
  agent_id: string;
}

export interface VehicleModelResponse {
  success?: boolean;
  message?: string;
  data?: Record<string, unknown>;
}

export async function postVehicleModel(
  payload: VehicleModel
): Promise<VehicleModelResponse> {
  const response = await axios.post(
    "/admin/vehicle/model",
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

  return response.data as VehicleModelResponse;
}
