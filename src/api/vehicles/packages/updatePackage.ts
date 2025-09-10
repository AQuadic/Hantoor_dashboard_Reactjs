import { axios } from "@/lib/axios";

export interface UpdatePackageRequest {
  name: {
    ar: string;
    en: string;
  };
  price: string; 
  is_active?: boolean;
}

export interface UpdatePackageResponse {
  id: number;
  vehicle_id: number;
  name: {
    ar: string;
    en: string;
  };
  price: number; 
  is_active: boolean;
  updated_at: string;
  created_at: string;
}

export const updatePackage = async (
  id: number,
  data: UpdatePackageRequest
): Promise<UpdatePackageResponse> => {
  const response = await axios.patch<UpdatePackageResponse>(
    `/admin/vehicle/package/${id}`,
    data,
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );
  return response.data;
};