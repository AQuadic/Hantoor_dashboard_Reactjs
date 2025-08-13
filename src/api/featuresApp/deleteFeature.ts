import { axios } from "@/lib/axios";

export const deleteFeature = async (id: number) => {
    const response = await axios.delete(`/admin/vehicle/feature-app/${id}`);
    return response.data;
};