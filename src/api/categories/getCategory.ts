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
  pagination?: boolean;
  page?: number;
  per_page?: number;
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
    const response = await axios.get<
      GetVehicleClassesPaginated | VehicleClass[]
    >("/admin/vehicle/class", {
      params,
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
