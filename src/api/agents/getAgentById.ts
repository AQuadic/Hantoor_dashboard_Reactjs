import { axios } from "@/lib/axios";

export interface ServiceCenter {
  id: number;
  agent_id: string;
  name: {
    ar: string;
    en: string;
  };
  description?: {
    ar: string;
    en: string;
  } | null;
  type: string;
  phone?: string | null;
  whatsapp?: string | null;
  phone_country?: string | null;
  phone_normalized?: string | null;
  phone_national?: string | null;
  phone_e164?: string | null;
  link_google_map?: string | null;
  created_at: string;
  updated_at: string;
}

export interface Agent {
  id: number;
  name: {
    ar: string;
    en: string;
  };
  website?: string | null;
  is_active: number;
  brand_id?: number;
  created_at: string;
  updated_at: string;
  centers_count?: number;
  show_rooms_count?: number;
  service_centers?: ServiceCenter[];
}

export async function getAgentById(id: number): Promise<Agent> {
  try {
    const response = await axios.get<Agent>(`/admin/agents/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    return response.data;
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : `Failed to fetch agent with id ${id}`;
    throw new Error(errorMessage);
  }
}
