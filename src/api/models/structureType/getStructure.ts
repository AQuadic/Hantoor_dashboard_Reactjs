import { axios } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export interface GetVehicleBodiesParams {
  search?: string;
  pagination?: boolean;
  page?: number;
  per_page?: number;
  from_date?: string;
  to_date?: string;
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
): Promise<VehicleBodiesPaginated | VehicleBody[]> => {
  const response = await axios.get<VehicleBodiesPaginated | VehicleBody[]>(
    "/admin/vehicle/body",
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      params,
    }
  );

  // When pagination=false, API returns array directly
  if (Array.isArray(response.data)) {
    return response.data;
  }

  // When paginated, API returns VehicleBodiesPaginated
  return response.data;
};

export const useVehicleBodies = (params?: GetVehicleBodiesParams) => {
  return useQuery<VehicleBodiesPaginated | VehicleBody[]>({
    queryKey: ["vehicleBodies", params],
    queryFn: () => getVehicleBodies(params),
  });
};
