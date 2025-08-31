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
  country_id?: string;
  type: FAQType;
  question?: FAQQuestion;
  answer?: FAQAnswer;
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
    const response = await axios.post<CreateFAQResponse>("/admin/faqs", payload);
    return response.data;
  } catch (error: any) {
    if (error.response) return error.response.data;
    return { success: false, message: "Network or server error" };
  }
};
