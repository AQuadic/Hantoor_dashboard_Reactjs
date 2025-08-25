import { axios } from "@/lib/axios";

export const deleteCountry = async (id: number) => {
    const response = await axios.delete(`/admin/country/${id}`);
    return response.data;
};
