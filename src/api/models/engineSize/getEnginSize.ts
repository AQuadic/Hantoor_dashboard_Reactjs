import { axios } from "@/lib/axios";

export interface EngineSize {
    id: number;
    is_active: boolean;
    name: {
        ar: string;
        en: string;
    };
    created_at: string;
    updated_at: string;
}

interface EngineSizesResponse {
    current_page: number;
    data: EngineSize[];
}

export const getEngineSize = async (): Promise<EngineSize[]> => {
    const res = await axios.get<EngineSizesResponse>("/admin/vehicle/engine-volume");
    return res.data.data;
};