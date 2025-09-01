import { axios } from "@/lib/axios";

export const deleteFAQ = async (id: number) => {
    const response = await axios.delete(`/admin/faqs/${id}`);
    return response.data;
};
