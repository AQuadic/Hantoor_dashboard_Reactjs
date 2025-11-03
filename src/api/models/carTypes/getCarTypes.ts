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
  pagination?: boolean | string;
  page?: number;
  per_page?: number;
  with_brand?: number;
  from_date?: string;
  to_date?: string;
  is_active?: boolean;
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
  const queryParams: Record<string, unknown> = {};

  // Send pagination parameter based on the value
  if (params?.pagination === false) {
    queryParams.pagination = false;
  } else if (params?.pagination === "normal" || params?.pagination === true) {
    queryParams.pagination = "normal";
  }

  // Add other parameters
  if (params?.search) queryParams.search = params.search;
  if (params?.body_type_id) queryParams.body_type_id = params.body_type_id;
  if (params?.brand_id) queryParams.brand_id = params.brand_id;
  if (params?.page) queryParams.page = params.page;
  if (params?.per_page) queryParams.per_page = params.per_page;
  if (params?.with_brand) queryParams.with_brand = params.with_brand;
  if (params?.from_date) queryParams.from_date = params.from_date;
  if (params?.to_date) queryParams.to_date = params.to_date;
  if (params?.is_active !== undefined) queryParams.is_active = params.is_active;

  const response = await axios.get<GetVehicleTypesPaginated | VehicleType[]>(
    "/admin/vehicle/type",
    {
      params: queryParams,
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
