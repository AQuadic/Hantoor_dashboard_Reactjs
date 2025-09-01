import { axios } from "@/lib/axios";

export const deleteBank = async (id: number) => {
    const response = await axios.delete(`/admin/banks/${id}`);
    return response.data;
};
