import { axios } from "@/lib/axios";

export const deletePackages = async (id: number) => {
    const response = await axios.delete(`/admin/vehicle/package/${id}`);
    return response.data;
};
