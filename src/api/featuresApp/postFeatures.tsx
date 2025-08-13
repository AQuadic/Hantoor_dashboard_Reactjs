import { axios } from "@/lib/axios";

export interface FeatureAppBody {
    description: {
        ar: string;
        en: string;
    };
    is_active?: boolean; 
}

export interface FeatureAppResponse {
    success: boolean;
    message: string;
    data?: any;
}

export const createFeatureApp = async (body: FeatureAppBody): Promise<FeatureAppResponse> => {
    try {
        const response = await axios.post<FeatureAppResponse>(
        "/admin/vehicle/feature-app",
        body,
        {
            headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            },
        }
        );
        return response.data;
    } catch (error: any) {
        console.error("Error creating feature app:", error.response?.data || error.message);
        throw error;
    }
};
