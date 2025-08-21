import { axios } from "@/lib/axios";

export interface UpdateSocialsPayload {
  facebook?: string;
  instagram?: string;
  whatsapp?: string;
  tiktok?: string;
  snapchat?: string;
  twitter?: string;
  linkedin?: string;
}

export const updateSocials = async (payload: UpdateSocialsPayload) => {
  const response = await axios.put("/admin/setting/socials", payload);
  return response.data;
};
