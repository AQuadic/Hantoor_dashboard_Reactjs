import { axios } from "@/lib/axios";

export interface EngineType {
  id: number;
  name: { ar: string; en: string };
  is_active?: boolean;
  created_at?: string;
  updated_at?: string;
}

export const getEngineTypeById = async (id: number): Promise<EngineType> => {
  const res = await axios.get<EngineType>(`/admin/engine-types/${id}`);
  return res.data; 
};
