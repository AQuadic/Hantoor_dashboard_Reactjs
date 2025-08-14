import { axios } from "@/lib/axios";

export interface Seat {
  id: number;
  name: { ar: string; en: string };
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

export const getSeatById = async (id: number): Promise<Seat> => {
  const res = await axios.get<Seat>(`/admin/seats/${id}`);
  return res.data;
};

