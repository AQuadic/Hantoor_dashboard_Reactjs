import { axios } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export interface GetVehicleBodiesParams {
  search?: string;
  pagination?: boolean | string;
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
  const queryParams: Record<string, unknown> = {};

  // Send pagination parameter based on the value
  if (params?.pagination === false) {
    queryParams.pagination = false;
  } else if (params?.pagination === "normal" || params?.pagination === true) {
    queryParams.pagination = "normal";
  }

  // Add other parameters
  if (params?.search) queryParams.search = params.search;
  if (params?.page) queryParams.page = params.page;
  if (params?.per_page) queryParams.per_page = params.per_page;
  if (params?.from_date) queryParams.from_date = params.from_date;
  if (params?.to_date) queryParams.to_date = params.to_date;

  const response = await axios.get<VehicleBodiesPaginated | VehicleBody[]>(
    "/admin/vehicle/body",
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      params: queryParams,
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
