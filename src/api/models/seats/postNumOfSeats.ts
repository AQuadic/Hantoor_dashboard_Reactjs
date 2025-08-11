import { axios } from "@/lib/axios";

export interface NumberOfSeats {
  name: {
    ar: string;
    en: string;
  };
}

export interface NumberOfSeatsResponse {
  success?: boolean;
  message?: string;
  data?: Record<string, unknown>;
}

export async function postNumberOfSeats(
  payload: NumberOfSeats
): Promise<NumberOfSeatsResponse> {
  const response = await axios.post(
    "/admin/seats",
    { ...payload, is_active: true },
    {}
  );
  return response.data as NumberOfSeatsResponse;
}
