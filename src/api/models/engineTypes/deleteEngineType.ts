import { axios } from "@/lib/axios";

export const deleteEngineType = async (id: number) => {
    const response = await axios.delete(`/admin/engine-types/${id}`);
    return response.data;
};