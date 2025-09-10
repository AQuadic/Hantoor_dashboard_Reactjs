import { axios } from "@/lib/axios";

export const deleteOffers = async (id: number) => {
    const response = await axios.delete(`/admin/vehicle/offer/${id}`);
    return response.data;
};
