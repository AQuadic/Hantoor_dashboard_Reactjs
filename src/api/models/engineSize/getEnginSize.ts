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
  pagination: boolean = true
): Promise<EngineSize[] | EngineSizesResponse> => {
  const params: Record<string, boolean> = {};
  if (!pagination) {
    params.pagination = false;
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
  search?: string;
  from_date?: string;
  to_date?: string;
}): Promise<EngineSizesResponse> => {
  const query: Record<string, unknown> = {};
  if (params?.page) query.page = params.page;
  if (params?.search) query.search = params.search;
  if (params?.from_date) query.from_date = params.from_date;
  if (params?.to_date) query.to_date = params.to_date;

  const res = await axios.get<EngineSizesResponse>(
    "/admin/vehicle/engine-volume",
    { params: query }
  );

  return res.data;
};
