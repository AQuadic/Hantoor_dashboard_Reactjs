import { axios } from "@/lib/axios";

export interface UpdateVehicleClassPayload {
  name?: { ar?: string; en?: string };
  is_active?: boolean;
  vehicle_type_id?: string;
}

export interface UpdateVehicleClassResponse {
  id: number;
  name: { ar: string; en: string };
  is_active: boolean;
  vehicle_type_id: string;
}

export async function updateVehicleClass(
  id: number,
  data: UpdateVehicleClassPayload
): Promise<UpdateVehicleClassResponse> {
  try {
    const response = await axios.patch<UpdateVehicleClassResponse>(
      `/admin/vehicle/class/${id}`,
      data,
      {
        headers: { "Content-Type": "application/json", Accept: "application/json" },
      }
    );
    return response.data;
  } catch (error: any) {
    if (error.response) throw new Error(error.response.data.message || "Failed to update class");
    throw new Error(error.message);
  }
}

// ✅ Fetch a single vehicle class by ID
export async function getVehicleClassById(id: number) {
  try {
    const response = await axios.get(`/admin/vehicle/class/${id}`);
    return response.data;
  } catch (error: any) {
    if (error.response) throw new Error(error.response.data.message || "Failed to fetch class");
    throw new Error(error.message);
  }
}