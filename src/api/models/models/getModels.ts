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
    if (!isPaginated) {
      // Fetch all data without pagination
      let allModels: Model[] = [];
      let currentPage = 1;
      let hasMore = true;

      while (hasMore) {
        const res = await axios.get<GetModelsResponse>("/admin/vehicle/model", {
          params: {
            page: currentPage,
            per_page: 100,
            search,
            ...dateParams,
          },
        });

        allModels = [...allModels, ...res.data.data];

        // Check if there are more pages
        if (currentPage >= res.data.meta.totalPages) {
          hasMore = false;
        } else {
          currentPage++;
        }
      }

      return allModels;
    }

    // Paginated response
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
