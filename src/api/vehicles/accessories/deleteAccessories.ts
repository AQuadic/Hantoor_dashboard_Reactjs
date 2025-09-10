import { axios } from "@/lib/axios";

export const deleteAccessories = async (id: number) => {
    const response = await axios.delete(`/admin/vehicle/accessory/${id}`);
    return response.data;
};
