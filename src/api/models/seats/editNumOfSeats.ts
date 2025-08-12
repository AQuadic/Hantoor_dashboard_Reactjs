import { axios } from "@/lib/axios";

export const updateNumberOfSeats = async (
  id: number,
  data: {
    name?: { ar?: string; en?: string };
    is_active?: boolean;
  }
) => {
    const res = await axios.patch(`/admin/seats/${id}`, data);
    return res.data;
};
