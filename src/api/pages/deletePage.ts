import { axios } from "@/lib/axios";

export const deletePage = async (id: number) => {
    const response = await axios.delete(`/admin/pages/${id}`);
    return response.data;
};
