import { axios } from "@/lib/axios";

export const deleteAdmin = async (admin: number) => {
    const response = await axios.delete(`/admin/${admin}`);
    return response.data;
};
