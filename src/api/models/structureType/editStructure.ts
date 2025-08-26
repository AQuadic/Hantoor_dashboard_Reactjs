import { axios } from "@/lib/axios";

export interface UpdateBodyTypePayload {
  name: {
    ar: string;
    en: string;
  };
  agent_id: number;
  is_active?: boolean;
}

export interface BodyType {
  id: number;
  name: {
    ar: string;
    en: string;
  };
  agent_id: number;
  vehicle_model_id: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export const updateBodyType = async (
  id: number,
  payload: UpdateBodyTypePayload
): Promise<BodyType> => {
  const { data } = await axios.patch<BodyType>(`/admin/vehicle/body/${id}`, payload, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  return data;
};