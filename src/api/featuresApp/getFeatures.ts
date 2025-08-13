import { axios } from "@/lib/axios";

export interface Feature {
  id: number;
  description: { ar: string; en: string };
  is_active: boolean ;
  image?: { id: number; uuid: string; url: string; responsive_urls: string[] };
  created_at: string;
  updated_at: string;
}

export const getFeatures = async (): Promise<Feature[]> => {
  const { data } = await axios.get<Feature[]>("/admin/vehicle/feature-app", {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  return data;
};
