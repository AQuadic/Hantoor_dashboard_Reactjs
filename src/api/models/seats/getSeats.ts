import { axios } from "@/lib/axios";

export interface numOfSeats {
  id: number;
  is_active: boolean | number;
  name: {
    ar: string;
    en: string;
  };
  created_at: string;
  updated_at: string;
}

export interface SeatsResponse {
  current_page: number;
  data: numOfSeats[];
  total: number;
  per_page: number;
  from: number;
  to: number;
}

export const getSeats = async (
  pagination: boolean = true
): Promise<numOfSeats[] | SeatsResponse> => {
  if (!pagination) {
    // Fetch all data without pagination
    let allSeats: numOfSeats[] = [];
    let currentPage = 1;
    let hasMore = true;

    while (hasMore) {
      const res = await axios.get("/admin/seats", {
        params: { page: currentPage, per_page: 100 },
      });

      let seatsData: numOfSeats[] = [];
      if (Array.isArray(res.data)) {
        seatsData = res.data as numOfSeats[];
      } else {
        seatsData = (res.data as SeatsResponse).data || [];
      }

      allSeats = [...allSeats, ...seatsData];

      // Check if response is paginated
      if (Array.isArray(res.data)) {
        hasMore = false; // API returned array, no more pages
      } else {
        const paginatedResponse = res.data as SeatsResponse;
        const totalPages =
          paginatedResponse.total && paginatedResponse.per_page
            ? Math.ceil(paginatedResponse.total / paginatedResponse.per_page)
            : 1;

        if (currentPage >= totalPages) {
          hasMore = false;
        } else {
          currentPage++;
        }
      }
    }

    return allSeats;
  }

  // Paginated/default response
  const res = await axios.get("/admin/seats");
  if (Array.isArray(res.data)) {
    return res.data as numOfSeats[];
  }
  return (res.data as SeatsResponse).data || [];
};

export const getSeatsPaginated = async (params?: {
  page?: number;
  search?: string;
  from_date?: string;
  to_date?: string;
}): Promise<SeatsResponse> => {
  const query: Record<string, unknown> = {};
  if (params?.page) query.page = params.page;
  if (params?.search) query.search = params.search;
  if (params?.from_date) query.from_date = params.from_date;
  if (params?.to_date) query.to_date = params.to_date;

  const res = await axios.get("/admin/seats", { params: query });

  if (res.data && Array.isArray((res.data as SeatsResponse).data)) {
    return res.data as SeatsResponse;
  }

  if (Array.isArray(res.data)) {
    const arr = res.data as numOfSeats[];
    return {
      current_page: params?.page ?? 1,
      data: arr,
      total: arr.length,
      per_page: arr.length,
      from: 1,
      to: arr.length,
    };
  }

  throw new Error("Unexpected response format from /admin/seats");
};
