import { axios } from "@/lib/axios";

export type FAQType = "Frequent Questions" | "Technical Support Questions";

export interface FAQQuestion {
  ar?: string;
  en: string;
}

export interface FAQAnswer {
  ar?: string;
  en: string;
}

export interface CreateFAQPayload {
  country_id: string;
  type: FAQType;
  question: FAQQuestion;
  answer: FAQAnswer;
}

export interface CreateFAQResponse {
  success: boolean;
  data?: any;
  message?: string;
  errors?: Record<string, string[]>;
}

export const createFAQ = async (
  payload: CreateFAQPayload
): Promise<CreateFAQResponse> => {
  try {
    // ensure answer fields follow expected structure: JSON string with { value }
    const safePayload = { ...payload } as any;
    if (safePayload.answer) {
      if (typeof safePayload.answer.ar === "string") {
        try {
          JSON.parse(safePayload.answer.ar);
          // already JSON - leave as is
        } catch {
          safePayload.answer.ar = JSON.stringify({
            value: safePayload.answer.ar,
          });
        }
      }
      if (typeof safePayload.answer.en === "string") {
        try {
          JSON.parse(safePayload.answer.en);
        } catch {
          safePayload.answer.en = JSON.stringify({
            value: safePayload.answer.en,
          });
        }
      }
    }

    const response = await axios.post<CreateFAQResponse>(
      "/admin/faqs",
      safePayload
    );
    return response.data;
  } catch (error: any) {
    if (error.response) return error.response.data;
    return { success: false, message: "Network or server error" };
  }
};
