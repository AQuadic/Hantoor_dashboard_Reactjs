import { axios } from "@/lib/axios";

export interface AddVehicleTypeDTO {
  name: {
    ar: string;
    en: string;
  };
  body_type_id: number; 
  is_active: boolean;
}

export const addVehicleType = async (data: AddVehicleTypeDTO) => {
  return axios.post("/admin/vehicle/type", data);
};