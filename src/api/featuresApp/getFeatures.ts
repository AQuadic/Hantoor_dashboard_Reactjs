import { axios } from "@/lib/axios";

export interface FeatureImage {
  id: number;
  uuid: string;
  size: number;
  url: string;
  responsive_urls: string[];
}

export interface Feature {
  id: number;
  description: { ar: string; en: string };
  is_active: number | boolean;
  created_at: string;
  updated_at: string;
  image: FeatureImage | null;
}

export interface FeaturesResponse {
  data: Feature[];
  meta: {
    current_page: number;
    per_page: number;
    total: number;
    last_page: number;
    from: number;
    to: number;
  };
}

interface GetFeaturesParams {
  pagination?: string;
  page: number;
  per_page?: number;
  search?: string;
}

export const getFeatures = async (
  params: GetFeaturesParams
): Promise<FeaturesResponse> => {
  const { data } = await axios.get<FeaturesResponse>(
    `/admin/vehicle/feature-app`,
    {
      params: {
        pagination: params.pagination || "normal",
        page: params.page,
        per_page: params.per_page || 15,
        ...(params.search && { search: params.search }),
      },
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );
  return data;
};