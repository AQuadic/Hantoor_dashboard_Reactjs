import { axios } from "@/lib/axios";

export const deleteUser = async (user: number) => {
    const response = await axios.delete(`/user/admin/${user}`);
    return response.data;
};
