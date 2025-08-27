import { axios } from "@/lib/axios";

export interface AdminUser {
  id: number;
  name: string;
  email: string | null;
  phone: string | null;
  signup_with: string;
  country_id?: number;
  city_id?: number;
  created_at: string;
  updated_at: string;
}

export const getAdminUser = async (userId: string | number): Promise<AdminUser> => {
  if (!userId) throw new Error("User ID is required"); 
  const response = await axios.get<AdminUser>(`/user/admin/${userId}`);
  return response.data; 
};
