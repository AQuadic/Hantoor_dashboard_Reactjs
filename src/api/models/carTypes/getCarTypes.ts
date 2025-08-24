import { axios } from "@/lib/axios";

export interface VehicleType {
  id: number;
  name: {
    ar: string;
    en: string;
  };
  body_type_id: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface GetVehicleTypesParams {
  search?: string;
  body_type_id?: number;
  pagination?: boolean;
}

export interface GetVehicleTypesResponse {
  data: VehicleType[];
  total?: number;
  page?: number;
  per_page?: number;
}

export const getVehicleTypes = async (params?: GetVehicleTypesParams): Promise<VehicleType[]> => {
  const response = await axios.get<VehicleType[]>("/admin/vehicle/type", {
    params,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  return response.data;
}