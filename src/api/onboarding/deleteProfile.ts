import { axios } from "@/lib/axios";

export const deleteProfile = async (id: number) => {
    const response = await axios.delete(`/admin/setting/onboarding/${id}`);
    return response.data;
};
