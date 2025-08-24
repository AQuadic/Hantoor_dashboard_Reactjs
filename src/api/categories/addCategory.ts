import { axios } from "@/lib/axios";

export interface AddCarClassPayload {
  name: {
    ar: string;
    en: string;
  };
  is_active?: boolean;
  vehicle_type_id: number;
}

export interface AddCarClassResponse {
  id: string;
  name: {
    ar: string;
    en: string;
  };
  is_active: boolean;
  vehicle_type_id: number;
  created_at: string;
  updated_at: string;
}

export const addCarClass = async (
  payload: AddCarClassPayload
): Promise<AddCarClassResponse> => {
  const response = await axios.post<AddCarClassResponse>(
    "/admin/vehicle/class",
    payload,
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );
  return response.data;
};
