import { axios } from "@/lib/axios";

export interface BrandOrigin {
    id: number;
    is_active: boolean;
    name: {
        ar: string;
        en: string;
    };
    created_at: string;
    updated_at: string;
}

export const getBrandOrigin = async (): Promise<BrandOrigin[]> => {
    const res = await axios.get<BrandOrigin[]>("/admin/brand-origin");
    return res.data;
};