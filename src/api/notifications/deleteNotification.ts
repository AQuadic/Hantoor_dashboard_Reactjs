import { axios } from "@/lib/axios";

export const deleteNotification = async (id: number) => {
    const response = await axios.delete(`/admin/broadcast_notifications/${id}`);
    return response.data;
};
