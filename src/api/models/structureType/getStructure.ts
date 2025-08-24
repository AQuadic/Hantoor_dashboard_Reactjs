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

export interface VehicleBodiesPaginated {
  current_page: number;
  data: VehicleBody[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: unknown[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

export const getVehicleBodies = async (
  params?: GetVehicleBodiesParams
): Promise<VehicleBodiesPaginated> => {
  const response = await axios.get<VehicleBodiesPaginated>(
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
  return useQuery<VehicleBodiesPaginated>({
    queryKey: ["vehicleBodies", params],
    queryFn: () => getVehicleBodies(params),
  });
};
