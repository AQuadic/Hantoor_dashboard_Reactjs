import { axios } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export interface GetVehicleBodiesParams {
  search?: string;
  vehicle_model_id?: number;
  pagination?: boolean;
}

export interface VehicleBody {
  id: number;
  name: {
    ar: string;
    en: string;
  };
  is_active: boolean | number;
  created_at: string;
  updated_at: string;
  vehicle_model_id: number;
}

export type VehicleBodiesResponse = VehicleBody[];

export const getVehicleBodies = async (
  params?: GetVehicleBodiesParams
): Promise<VehicleBodiesResponse> => {
  const response = await axios.get<VehicleBodiesResponse>(
    "/admin/vehicle/body",
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      params,
    }
  );
  return response.data;
};

export const useVehicleBodies = (params?: GetVehicleBodiesParams) => {
  return useQuery({
    queryKey: ["vehicleBodies", params],
    queryFn: () => getVehicleBodies(params),
  });
};
