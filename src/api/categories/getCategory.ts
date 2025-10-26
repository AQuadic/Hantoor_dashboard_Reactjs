import { axios } from "@/lib/axios";

export interface VehicleClass {
  id: number;
  name: {
    ar: string;
    en: string;
  };
  vehicle_type_id: number;
  is_active: boolean;
}

export interface GetVehicleClassesParams {
  search?: string;
  vehicle_type_id?: number;
  pagination?: boolean | string;
  page?: number;
  per_page?: number;
  from_date?: string;
  to_date?: string;
}

export interface GetVehicleClassesPaginated {
  current_page: number;
  data: VehicleClass[];
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

export const getVehicleClasses = async (
  params?: GetVehicleClassesParams
): Promise<GetVehicleClassesPaginated | VehicleClass[]> => {
  try {
    const queryParams: Record<string, unknown> = {};

    // Send pagination parameter based on the value
    if (params?.pagination === false) {
      queryParams.pagination = false;
    } else if (params?.pagination === "normal" || params?.pagination === true) {
      queryParams.pagination = "normal";
    }

    // Add other parameters
    if (params?.search) queryParams.search = params.search;
    if (params?.vehicle_type_id)
      queryParams.vehicle_type_id = params.vehicle_type_id;
    if (params?.page) queryParams.page = params.page;
    if (params?.per_page) queryParams.per_page = params.per_page;
    if (params?.from_date) queryParams.from_date = params.from_date;
    if (params?.to_date) queryParams.to_date = params.to_date;

    const response = await axios.get<
      GetVehicleClassesPaginated | VehicleClass[]
    >("/admin/vehicle/class", {
      params: queryParams,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    // When pagination=false, API returns array directly
    if (Array.isArray(response.data)) {
      return response.data;
    }

    // When paginated, API returns GetVehicleClassesPaginated
    return response.data;
  } catch (error: unknown) {
    console.error("Error fetching vehicle classes:", error);
    throw error;
  }
};
