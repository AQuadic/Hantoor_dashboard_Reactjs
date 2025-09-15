

import { axios } from "@/lib/axios";

export const deleteVehicleConversation = async (id: number) => {
    const response = await axios.delete(`/admin/vehicle/conversation/${id}`);
    return response.data;
};
