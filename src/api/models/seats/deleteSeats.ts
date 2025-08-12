import { axios } from "@/lib/axios";

export const deleteSeats = async (id: number) => {
    const response = await axios.delete(`/admin/seats/${id}`);
    return response.data;
};
