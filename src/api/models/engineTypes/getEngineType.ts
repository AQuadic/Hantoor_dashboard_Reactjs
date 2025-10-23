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
  if (!pagination) {
    // Fetch all data without pagination
    let allTypes: EngineType[] = [];
    let currentPage = 1;
    let hasMore = true;

    while (hasMore) {
      const res = await axios.get<EngineTypesResponse>("/admin/engine-types", {
        params: { page: currentPage, per_page: 100 },
      });

      allTypes = [...allTypes, ...res.data.data];

      // Check if there are more pages
      const totalPages =
        res.data.total && res.data.per_page
          ? Math.ceil(res.data.total / res.data.per_page)
          : 1;

      if (currentPage >= totalPages) {
        hasMore = false;
      } else {
        currentPage++;
      }
    }

    return allTypes;
  }

  // Paginated/default response
  const res = await axios.get<EngineTypesResponse>("/admin/engine-types");
  return res.data.data;
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
