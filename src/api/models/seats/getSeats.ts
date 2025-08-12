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

export const getSeats = async (): Promise<numOfSeats[]> => {
    const res = await axios.get<numOfSeats[]>("/admin/seats");
    return res.data;
};