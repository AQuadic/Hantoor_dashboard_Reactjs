import { axios } from "@/lib/axios";

export interface UpdateAccessoryPayload {
  name: {
    ar: string;
    en: string;
  };
  price: string;
  is_active?: boolean;
}

export interface AccessoryResponse {
  id: number;
  vehicle_id: number;
  name: {
    ar: string;
    en: string;
  };
  price: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export const updateAccessory = async (
  id: number,
  payload: UpdateAccessoryPayload
): Promise<AccessoryResponse> => {
  const response = await axios.patch<AccessoryResponse>(
    `/admin/vehicle/accessory/${id}`,
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
