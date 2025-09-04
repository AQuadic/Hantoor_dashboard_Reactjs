import { axios } from "@/lib/axios";

export const deletePriceTo = async (id: number) => {
    const response = await axios.delete(`/admin/priceto/${id}`);
    return response.data;
};
