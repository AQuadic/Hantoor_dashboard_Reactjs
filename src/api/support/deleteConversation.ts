import { axios } from "@/lib/axios";

export const deleteConversation = async (id: number) => {
    const response = await axios.delete(`/admin/support/conversations/${id}`);
    return response.data;
};
