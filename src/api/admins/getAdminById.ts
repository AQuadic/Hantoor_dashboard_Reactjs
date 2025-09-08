import { axios } from "@/lib/axios";

export interface AdminImage {
  id: number;
  uuid?: string;
  size?: number;
  url?: string;
  responsive_urls?: string[];
}

export interface Admin {
  id: number;
  name: string;
  email: string;
  // Phone fields returned by API (optional)
  phone?: string | null;
  phone_country?: string | null;
  phone_normalized?: string | null;
  phone_national?: string | null;
  phone_e164?: string | null;
  mobile?: string | null;
  email_verified_at?: string | null;
  image?: AdminImage | null;
  created_at: string;
  updated_at: string;
}

export async function getAdmin(admin: string | number): Promise<Admin> {
  try {
    const response = await axios.get<Admin>(`/admin/${admin}`);

    return response.data;
  } catch (err: unknown) {
    // Compact safe logging
    try {
      let msg: string | undefined;
      if (typeof err === "object" && err !== null && "message" in err) {
        const e = err as Record<string, unknown>;
        if (typeof e.message === "string") msg = e.message;
      }
      if (msg) console.error("Failed to fetch admin:", msg);
      else console.error("Failed to fetch admin:", err);
    } catch {
      console.error("Failed to fetch admin: unknown error");
    }
    throw err;
  }
}
