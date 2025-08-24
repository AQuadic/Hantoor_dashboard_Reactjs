import { axios } from "@/lib/axios";

export const deleteBodyType = async (id: number) => {
    const response = await axios.delete(`/admin/vehicle/body/${id}`);
    return response.data;
};