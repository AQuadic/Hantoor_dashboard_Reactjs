import { axios } from "@/lib/axios";

export interface AdminUserImage {
  url: string;
  file_name: string;
  mime_type: string;
  responsive_urls: string[];
  uuid: string;
}

export interface AdminUser {
  id: number;
  name: string;
  email: string | null;
  phone: string | null;
  signup_with: string;
  phone_country?: string;
  country_id?: number;
  country?: {
    id: number;
    name: { ar: string; en: string };
    code: string;
    currency: string;
  };
  image?: AdminUserImage;
  created_at: string;
  updated_at: string;
}

export const getAdminUser = async (userId: string | number): Promise<AdminUser> => {
  if (!userId) throw new Error("User ID is required"); 
  const response = await axios.get<AdminUser>(`/user/admin/${userId}`);
  return response.data; 
};
