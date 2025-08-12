import { axios } from "@/lib/axios";

export interface EngineType {
    id: number;
    is_active: boolean;
    name: {
        ar: string;
        en: string;
    };
    created_at: string;
    updated_at: string;
}

interface EngineTypesResponse {
    current_page: number;
    data: EngineType[];
}

export const getEngineType = async (): Promise<EngineType[]> => {
    const res = await axios.get<EngineTypesResponse>("/admin/engine-types");
    return res.data.data;
};