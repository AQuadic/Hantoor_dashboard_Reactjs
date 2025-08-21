import { axios } from "@/lib/axios";

export interface SocialLinks {
  snapchat: string;
  instagram: string;
  facebook: string;
  tiktok: string;
  linkedin: string;
  twitter: string;
  whatsapp: string;
}

export interface SocialsResponse {
  current_page: number;
  current_page_url: string;
  data: SocialLinks;
  first_page_url: string;
  from: number;
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
}

export const getSocials = async (page: number = 1): Promise<SocialsResponse> => {
  const response = await axios.get<SocialsResponse>(
    `/admin/setting/socials?page=${page}`
  );
  return response.data;
};
