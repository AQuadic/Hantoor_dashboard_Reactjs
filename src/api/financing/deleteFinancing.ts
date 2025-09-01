import { axios } from "@/lib/axios";

export const deleteFinancing = async (id: number) => {
    const response = await axios.delete(`/admin/request-financing/${id}`);
    return response.data;
};
