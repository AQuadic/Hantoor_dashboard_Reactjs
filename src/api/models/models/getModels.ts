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
  dateParams?: { from_date?: string; to_date?: string }
): Promise<GetModelsResponse> => {
  try {
    const res = await axios.get<GetModelsResponse>("/admin/vehicle/model", {
      params: {
        page,
        per_page: perPage,
        search,
        ...dateParams, 
      },
    });

    console.log("API Response:", res.data);
    return res.data;
  } catch (error) {
    console.error("Failed to fetch models:", error);
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
