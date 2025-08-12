import { axios } from "@/lib/axios";

export const deleteBrandOrigin = async (id: number) => {
    const response = await axios.delete(`/admin/brand-origin/${id}`);
    return response.data;
};
