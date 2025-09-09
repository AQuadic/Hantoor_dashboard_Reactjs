import { axios } from "@/lib/axios";

export interface FaqPayload {
  country_id?: string;
  type?: "Frequent Questions" | "Technical Support Questions";
  question?: {
    ar?: string;
    en?: string;
  };
  answer?: {
    ar?: string;
    en?: string;
  };
  is_active?: number;
}

export interface FaqResponse {
  id: string;
  country_id?: string;
  type: string;
  question: {
    ar: string;
    en: string;
  };
  answer: {
    ar: string;
    en: string;
  };
  created_at?: string;
  updated_at?: string;
}

export async function updateFaq(id: string, data: FaqPayload): Promise<FaqResponse> {
  const response = await axios.post<FaqResponse>(
    `/admin/faqs/${id}`,
    data,
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );
  return response.data;
}
