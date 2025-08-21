import { axios } from "@/lib/axios";

export interface Model {
  id: number;
  name: { ar: string; en: string };
  agent_id: number;
  is_active: boolean;
}

export interface GetModelsResponse {
  data: Model[];
}

export const getModels = async (): Promise<Model[]> => {
  try {
    const res = await axios.get<Model[]>("/admin/vehicle/model", {
      params: { pagination: false },
    });

    console.log("API Response:", res.data);
    return res.data;
  } catch (error) {
    console.error("Failed to fetch models:", error);
    return [];
  }
};
