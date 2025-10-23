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
  if (!pagination) {
    // Fetch all data without pagination
    let allSizes: EngineSize[] = [];
    let currentPage = 1;
    let hasMore = true;

    while (hasMore) {
      const res = await axios.get<EngineSizesResponse>(
        "/admin/vehicle/engine-volume",
        { params: { page: currentPage, per_page: 100 } }
      );

      allSizes = [...allSizes, ...res.data.data];

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

    return allSizes;
  }

  // Paginated/default response
  const res = await axios.get<EngineSizesResponse>(
    "/admin/vehicle/engine-volume"
  );
  return res.data.data;
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
