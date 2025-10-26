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
  const params: Record<string, boolean> = {};
  if (!pagination) {
    params.pagination = false;
  }

  const res = await axios.get<numOfSeats[] | SeatsResponse>("/admin/seats", {
    params,
  });

  // When pagination=false, API returns array directly
  if (Array.isArray(res.data)) {
    return res.data;
  }

  // When paginated, API returns SeatsResponse
  return res.data;
};

export const getSeatsPaginated = async (params?: {
  page?: number;
  per_page?: number;
  search?: string;
  from_date?: string;
  to_date?: string;
}): Promise<SeatsResponse> => {
  const query: Record<string, unknown> = {};
  if (params?.page) query.page = params.page;
  if (params?.per_page) query.per_page = params.per_page;
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
