import { axios } from "@/lib/axios";

export interface FAQ {
  id: number;
  type: "Frequent Questions" | "Technical Support Questions";
  question: {
    ar: string;
    en: string;
  };
  answer: {
    ar: string;
    en: string;
  };
  country_id?: number | null;
  order_column?: number;
  created_at: string;
  updated_at?: string;
}

export async function getFAQById(id: string | number): Promise<FAQ> {
  const response = await axios.get<FAQ>(`/admin/faqs/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  return response.data;
}
