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
  is_active: number;
  created_at: string;
  updated_at: string;
  image: FeatureImage | null;
}

export interface FeaturesResponse {
  current_page: number;
  current_page_url: string;
  data: Feature[];
  first_page_url: string;
  from: number;
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  last_page: number;
  total: number;
}

export const getFeatures = async (page: number, perPage: number) => {
  const { data } = await axios.get<FeaturesResponse>(
    `/admin/vehicle/feature-app?pagination=true&page=${page}&per_page=${perPage}`,{
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    } 
  }
  );
  return data;
};
