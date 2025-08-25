import { axios } from "@/lib/axios";

export interface Country {
  id: number;
  name: { ar: string; en: string };
  code: string;
  currency: { ar: string; en: string } | null;
  tax: string | null;
  time_type: "day" | "month" | "year" | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export async function getCountryById(id: number): Promise<Country> {
  const response = await axios.get<Country>(`/admin/country/${id}`);
  return response.data;
}
