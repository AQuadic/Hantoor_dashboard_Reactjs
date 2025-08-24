import { axios } from "@/lib/axios";

export const deleteModel = async (id: number) => {
    const response = await axios.delete(`/admin/vehicle/model/${id}`);
    return response.data;
};