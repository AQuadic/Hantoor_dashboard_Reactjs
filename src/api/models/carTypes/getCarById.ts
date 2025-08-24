import { axios } from "@/lib/axios";

export interface CarType {
  id: number;
  name: { ar: string; en: string };
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

export const getCarTypeById = async (id: number): Promise<CarType> => {
  const res = await axios.get<CarType>(`/admin/vehicle/type/${id}`);
  return res.data;
};

