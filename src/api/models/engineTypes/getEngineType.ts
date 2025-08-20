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

export const getEngineType = async (): Promise<EngineType[]> => {
  const res = await axios.get<EngineTypesResponse>("/admin/engine-types");
  return res.data.data;
};

export const getEngineTypePaginated = async (params?: {
  page?: number;
  search?: string;
}): Promise<EngineTypesResponse> => {
  const query: Record<string, unknown> = {};
  if (params?.page) query.page = params.page;
  if (params?.search) query.search = params.search;

  const res = await axios.get<EngineTypesResponse>("/admin/engine-types", {
    params: query,
  });
  return res.data as EngineTypesResponse;
};
