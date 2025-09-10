import { axios } from "@/lib/axios";

export interface Suggestion {
  id: number;
  name: string;
  email: string;
  phone: string;
  city: string;
  status: string;
  type: string;
  phone_country: string;
  phone_normalized: string;
  phone_national: string;
  phone_e164: string;
  title: string;
  message: string;
  read_at: string | null;
  created_at: string;
  updated_at: string;
  is_starred: boolean;
}

export const getSuggestion = async (id: string): Promise<Suggestion> => {
  const response = await axios.get<Suggestion>(`/admin/suggestions/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  return response.data;
};

export const updateSuggestion = async (
  id: number | string,
  payload: Partial<Suggestion>
): Promise<Suggestion> => {
  const response = await axios.post<Suggestion>(`/admin/suggestions/${id}`, payload, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  return response.data;
};