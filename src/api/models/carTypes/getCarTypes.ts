import { axios } from "@/lib/axios";

export interface VehicleType {
  id: number;
  name: {
    ar: string;
    en: string;
  };
  body_type_id: number;
  brand_id: number;
  brand?: {
    id: number;
    name: {
      ar: string;
      en: string;
    };
  };
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface GetVehicleTypesParams {
  search?: string;
  body_type_id?: number;
  brand_id?: number;
  pagination?: boolean;
  page?: number;
  per_page?: number;
  with_brand?: number;
  from_date?: string;
  to_date?: string;
}

export interface GetVehicleTypesPaginated {
  current_page: number;
  data: VehicleType[];
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

export type GetVehicleTypesResponse = GetVehicleTypesPaginated | VehicleType[];

export const getVehicleTypes = async (
  params?: GetVehicleTypesParams
): Promise<GetVehicleTypesPaginated | VehicleType[]> => {
  const response = await axios.get<GetVehicleTypesPaginated | VehicleType[]>(
    "/admin/vehicle/type",
    {
      params,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );

  // When pagination=false, API returns array directly
  if (Array.isArray(response.data)) {
    return response.data;
  }

  // When paginated, API returns GetVehicleTypesPaginated
  return response.data;
};
