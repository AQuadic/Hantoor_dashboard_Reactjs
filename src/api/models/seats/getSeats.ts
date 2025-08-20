import { axios } from "@/lib/axios";

export interface numOfSeats {
  id: number;
  is_active: boolean;
  name: {
    ar: string;
    en: string;
  };
  created_at: string;
  updated_at: string;
}

interface SeatsResponse {
  current_page: number;
  data: numOfSeats[];
  total?: number;
  per_page?: number;
  from?: number;
  to?: number;
}

export const getSeats = async (): Promise<numOfSeats[]> => {
  const res = await axios.get<SeatsResponse>("/admin/seats");
  // Some legacy uses expect the array directly
  return (
    (res.data as unknown as SeatsResponse).data ||
    (res.data as unknown as numOfSeats[])
  );
};

export const getSeatsPaginated = async (params?: {
  page?: number;
  search?: string;
}): Promise<SeatsResponse> => {
  const query: Record<string, unknown> = {};
  if (params?.page) query.page = params.page;
  if (params?.search) query.search = params.search;

  const res = await axios.get<SeatsResponse>("/admin/seats", { params: query });
  return res.data as SeatsResponse;
};
