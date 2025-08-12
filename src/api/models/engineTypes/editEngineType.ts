import { axios } from "@/lib/axios";

export const updateEngineType = async (
  id: number,
  data: {
    name?: { ar?: string; en?: string };
    is_active?: boolean;
  }
) => {
    const res = await axios.patch(`/admin/engine-types/${id}`, data);
    return res.data;
};
