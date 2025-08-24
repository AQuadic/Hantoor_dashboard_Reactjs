import { axios } from "@/lib/axios";

export const deleteCarType = async (id: number) => {
    const response = await axios.delete(`/admin/vehicle/type/${id}`);
    return response.data;
};
