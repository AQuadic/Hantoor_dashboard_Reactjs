import { axios } from "@/lib/axios";

export const updateEngineSize = async (
  id: number,
  data: {
    name?: { ar?: string; en?: string };
    is_active?: boolean;
  }
) => {
    const res = await axios.patch(`/admin/vehicle/engine-volume/${id}`, data);
    return res.data;
};
