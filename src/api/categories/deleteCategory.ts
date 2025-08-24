import { axios } from "@/lib/axios";

export const deleteCategory = async (id: number) => {
    const response = await axios.delete(`/admin/vehicle/class/${id}`);
    return response.data;
};