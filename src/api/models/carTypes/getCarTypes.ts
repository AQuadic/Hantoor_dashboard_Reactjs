import { axios } from "@/lib/axios";

export interface VehicleType {
  id: number;
  name: {
    ar: string;
    en: string;
  };
  body_type_id: number;
  brand_id: number;
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
  return response.data;
};
