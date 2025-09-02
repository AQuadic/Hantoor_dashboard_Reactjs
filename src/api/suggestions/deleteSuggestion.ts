import { axios } from "@/lib/axios";

export const deleteSuggestions = async (id: number) => {
    const response = await axios.delete(`/admin/suggestions/${id}`);
    return response.data;
};
