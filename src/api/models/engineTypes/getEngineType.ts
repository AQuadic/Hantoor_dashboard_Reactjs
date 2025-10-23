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
  search?: string;
  from_date?: string;
  to_date?: string;
}): Promise<EngineTypesResponse> => {
  const query: Record<string, unknown> = {};
  if (params?.page) query.page = params.page;
  if (params?.search) query.search = params.search;
  if (params?.from_date) query.from_date = params.from_date;
  if (params?.to_date) query.to_date = params.to_date;

  const res = await axios.get<EngineTypesResponse>("/admin/engine-types", {
    params: query,
  });

  return res.data;
};
