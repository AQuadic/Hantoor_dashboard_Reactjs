import { axios } from "@/lib/axios";

export interface Model {
  id: number;
  name: { ar: string; en: string };
  is_active: boolean;
}

export interface PaginationMeta {
  totalItems: number;
  totalPages: number;
  itemsPerPage: number;
  currentPage: number;
}

export interface GetModelsResponse {
  data: Model[];
  meta: PaginationMeta;
}

export const getModels = async (
  page: number = 1,
  perPage: number = 10,
  search: string = "",
  dateParams?: { from_date?: string; to_date?: string },
  isPaginated: boolean = true
): Promise<GetModelsResponse | Model[]> => {
  try {
    const params: Record<string, string | number | boolean> = {};

    if (isPaginated) {
      params.page = page;
      params.per_page = perPage;
    } else {
      params.pagination = false;
    }

    if (search) params.search = search;
    if (dateParams?.from_date) params.from_date = dateParams.from_date;
    if (dateParams?.to_date) params.to_date = dateParams.to_date;

    const res = await axios.get<GetModelsResponse | Model[]>(
      "/admin/vehicle/model",
      { params }
    );

    console.log("API Response:", res.data);

    // When pagination=false, API returns array directly
    if (Array.isArray(res.data)) {
      return res.data;
    }

    // When paginated, API returns GetModelsResponse
    return res.data;
  } catch (error) {
    console.error("Failed to fetch models:", error);

    if (!isPaginated) {
      return [];
    }

    return {
      data: [],
      meta: {
        totalItems: 0,
        totalPages: 1,
        itemsPerPage: perPage,
        currentPage: page,
      },
    };
  }
};
