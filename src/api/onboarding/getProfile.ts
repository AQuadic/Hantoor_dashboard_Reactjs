import { axios } from "@/lib/axios";

export interface Country {
  id: number;
  code: string;
  name: {
    ar: string;
    en: string;
  };
  currency?: string | null;
  currency_text?: {
    ar: string;
    en: string;
  };
  is_active?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface OnboardingItem {
  id: number;
  country_id: number;
  country?: Country;
  image: string | { url: string };
  title: {
    ar: string;
    en: string;
  };
  description: {
    ar: string;
    en: string;
  };
  is_active: boolean | number;
  created_at: string;
  updated_at?: string;
}

export interface GetOnboardingParams {
  country_id?: number;
  pagination?: "simple" | "normal" | "none";
  per_page?: number;
  is_active?: boolean;
}

export async function getOnboardings(params: GetOnboardingParams = {}): Promise<OnboardingItem[]> {
  const response = await axios.get<OnboardingItem[]>("/admin/setting/onboarding", {
    params,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  return response.data;
}