import { axios } from "@/lib/axios";

export interface Admin {
  id: number;
  name: string;
  email: string;
  mobile?: string | null;
  email_verified_at?: string | null;
  created_at: string;
  updated_at: string;
}

export async function getAdmin(admin: string | number): Promise<Admin> {
  try {
    const response = await axios.get<Admin>(`/admin/${admin}`);

    return response.data;
  } catch (error: any) {
    console.error("Failed to fetch admin:", error.response?.data || error.message);
    throw error;
  }
}
