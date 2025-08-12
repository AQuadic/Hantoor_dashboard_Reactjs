import { axios } from "@/lib/axios";

export const deleteEngineSize= async (id: number) => {
    const response = await axios.delete(`/admin/vehicle/engine-volume/${id}`);
    return response.data;
};