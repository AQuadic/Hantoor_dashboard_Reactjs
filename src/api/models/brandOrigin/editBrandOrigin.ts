import { axios } from "@/lib/axios";

export const updateBrandOrigin = async (
  id: number,
  data: {
    name?: { ar?: string; en?: string };
    is_active?: boolean;
  }
) => {
    const res = await axios.patch(`/admin/brand-origin/${id}`, data);
    return res.data;
};
