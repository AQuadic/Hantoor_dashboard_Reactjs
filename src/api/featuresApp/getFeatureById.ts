import { axios } from "@/lib/axios";

export type Feature = {
  id: number;
  description: {
    ar: string;
    en: string;
  };
  is_active: boolean;
  image?: string;
};

export const getFeatureById = async (id: number): Promise<Feature> => {
  const res = await axios.get<Feature>(`/admin/vehicle/feature-app/${id}`);
  return res.data;
};
