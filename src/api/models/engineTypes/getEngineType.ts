import { axios } from "@/lib/axios";

export interface EngineType {
  id: number;
  is_active: boolean;
  name: {
    ar: string;
    en: string;
  };
  created_at: string;
  updated_at: string;
}

interface EngineTypesResponse {
  current_page: number;
  data: EngineType[];
  total?: number;
  per_page?: number;
  from?: number;
  to?: number;
}

export const getEngineType = async (
  pagination: boolean = true
): Promise<EngineType[] | EngineTypesResponse> => {
  const params: Record<string, boolean> = {};
  if (!pagination) {
    params.pagination = false;
  }

  const res = await axios.get<EngineType[] | EngineTypesResponse>(
    "/admin/engine-types",
    { params }
  );

  // When pagination=false, API returns array directly
  if (Array.isArray(res.data)) {
    return res.data;
  }

  // When paginated, API returns EngineTypesResponse
  return res.data;
};

export const getEngineTypePaginated = async (params?: {
  page?: number;
  per_page?: number;
  search?: string;
  from_date?: string;
  to_date?: string;
  pagination?: boolean | string;
}): Promise<EngineTypesResponse> => {
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

  const res = await axios.get<EngineTypesResponse>("/admin/engine-types", {
    params: queryParams,
  });

  return res.data;
};
