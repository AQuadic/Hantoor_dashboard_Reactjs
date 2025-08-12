import { axios } from "@/lib/axios";

export const deleteBrands = async (id: number) => {
    const response = await axios.delete(`/admin/brands/${id}`);
    return response.data;
};
