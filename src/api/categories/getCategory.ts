import { axios } from "@/lib/axios";

export interface VehicleClass {
  id: number;
  name: {
    ar: string;
    en: string;
  };
  vehicle_type_id: number;
  is_active: boolean;
}

export const getVehicleClasses = async (): Promise<VehicleClass[]> => {
  try {
    const response = await axios.get<{ data: VehicleClass[] } | VehicleClass[]>("/admin/vehicle/class");

    return Array.isArray(response.data) ? response.data : response.data.data ?? [];
  } catch (error: any) {
    console.error("Error fetching vehicle classes:", error);
    throw error;
  }
};
