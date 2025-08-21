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
  const res = await axios.get<GetModelsResponse>("/admin/vehicle/model", {
    params: { pagination: false },
  });

  return res.data.data;
};
