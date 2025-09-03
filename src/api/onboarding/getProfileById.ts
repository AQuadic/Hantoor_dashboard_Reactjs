import { axios } from "@/lib/axios";

export interface OnboardingDetail {
  id: number;
  country_id: number;
  image: string | { url: string } | null;
  title: {
    ar: string;
    en: string;
  };
  description: {
    ar: string;
    en: string;
  };
  is_active: boolean;
  created_at: string;
  updated_at?: string;
  data: OnboardingDetail
}

export async function getOnboardingById(id: string): Promise<OnboardingDetail> {
  const response = await axios.get<OnboardingDetail>(`/admin/setting/onboarding/${id}`);
  return response.data;
}
