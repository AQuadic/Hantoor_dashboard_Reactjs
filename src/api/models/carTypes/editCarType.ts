import { axios } from "@/lib/axios";

export interface UpdateCarTypePayload {
  name?: {
    ar?: string;
    en?: string;
  };
  is_active?: boolean;
  vehicle_body_type_id?: string;
  brand_id?: number;
}

export interface UpdateCarTypeResponse {
  id: string;
  name: {
    ar: string;
    en: string;
  };
  is_active: boolean;
  vehicle_body_type_id: string;
  created_at: string;
  updated_at: string;
}

export const updateCarType = async (
  id: number,
  payload: UpdateCarTypePayload
): Promise<UpdateCarTypeResponse> => {
  const response = await axios.patch<UpdateCarTypeResponse>(
    `/admin/vehicle/type/${id}`,
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
