import { axios } from "@/lib/axios";

export const editVehicleModel = async (
  id: number,
  data: {
    name?: { ar?: string; en?: string };
    is_active?: boolean;
    agent_id?: number;
  }
) => {
  const res = await axios.patch(`/admin/vehicle/model/${id}`, data);
  return res.data;
};
