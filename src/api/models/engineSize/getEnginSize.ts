import { axios } from "@/lib/axios";

export interface EngineSize {
  id: number;
  is_active: boolean;
  name: {
    ar: string;
    en: string;
  };
  created_at: string;
  updated_at: string;
}

interface EngineSizesResponse {
  current_page: number;
  data: EngineSize[];
  total?: number;
  per_page?: number;
  from?: number;
  to?: number;
}

export const getEngineSize = async (
  pagination: boolean = true,
  is_active?: boolean
): Promise<EngineSize[] | EngineSizesResponse> => {
  const params: Record<string, boolean> = {};
  if (!pagination) {
    params.pagination = false;
  }
  if (is_active !== undefined) {
    params.is_active = is_active;
  }

  const res = await axios.get<EngineSize[] | EngineSizesResponse>(
    "/admin/vehicle/engine-volume",
    { params }
  );

  // When pagination=false, API returns array directly
  if (Array.isArray(res.data)) {
    return res.data;
  }

  // When paginated, API returns EngineSizesResponse
  return res.data;
};

export const getEngineSizePaginated = async (params?: {
  page?: number;
  per_page?: number;
  search?: string;
  from_date?: string;
  to_date?: string;
  pagination?: boolean | string;
  is_active?: boolean;
}): Promise<EngineSizesResponse> => {
  const queryParams: Record<string, unknown> = {};

  // Send pagination parameter based on the value
  if (params?.pagination === false) {
    queryParams.pagination = false;
  } else if (params?.pagination === "normal" || params?.pagination === true) {
    queryParams.pagination = "normal";
  }

  if (params?.page) queryParams.page = params.page;
  if (params?.per_page) queryParams.per_page = params.per_page;
  if (params?.search) queryParams.search = params.search;
  if (params?.from_date) queryParams.from_date = params.from_date;
  if (params?.to_date) queryParams.to_date = params.to_date;
  if (params?.is_active !== undefined) queryParams.is_active = params.is_active;

  const res = await axios.get<EngineSizesResponse>(
    "/admin/vehicle/engine-volume",
    { params: queryParams }
  );

  return res.data;
};
