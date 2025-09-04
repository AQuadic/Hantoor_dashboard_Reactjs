import { axios } from "@/lib/axios";

export const deletePriceFrom = async (id: number) => {
    const response = await axios.delete(`/admin/pricefrom/${id}`);
    return response.data;
};
