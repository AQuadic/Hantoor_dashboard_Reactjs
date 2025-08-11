import { axios } from "@/lib/axios";

export interface numOfSeats {
    id: number;
    is_active: boolean;
    name: {
        ar: string;
        en: string;
    };
    created_at: string;
    updated_at: string;
}

interface SeatsResponse {
    current_page: number;
    data: numOfSeats[];
}

export const getSeats = async (): Promise<numOfSeats[]> => {
    const res = await axios.get<SeatsResponse>("/admin/seats");
    return res.data.data;
};