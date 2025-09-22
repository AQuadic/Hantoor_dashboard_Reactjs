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

export async function updateFaq(
  id: string,
  data: FaqPayload
): Promise<FaqResponse> {
  // ensure answer fields follow expected structure: JSON string with { value }
  const safeData = { ...data } as any;
  if (safeData.answer) {
    if (typeof safeData.answer.ar === "string") {
      try {
        JSON.parse(safeData.answer.ar);
      } catch {
        safeData.answer.ar = JSON.stringify({ value: safeData.answer.ar });
      }
    }
    if (typeof safeData.answer.en === "string") {
      try {
        JSON.parse(safeData.answer.en);
      } catch {
        safeData.answer.en = JSON.stringify({ value: safeData.answer.en });
      }
    }
  }

  const response = await axios.post<FaqResponse>(
    `/admin/faqs/${id}`,
    safeData,
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );
  return response.data;
}
