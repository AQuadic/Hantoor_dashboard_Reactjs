import { axios } from "@/lib/axios";

export interface EngineSize {
  id: number;
  name: { ar: string; en: string };
  is_active?: boolean;
  created_at?: string;
  updated_at?: string;
}

export const getEngineSizeById = async (id: number): Promise<EngineSize> => {
  const res = await axios.get<EngineSize>(`/admin/vehicle/engine-volume/${id}`);
  return res.data; 
};
