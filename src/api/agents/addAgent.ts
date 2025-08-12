import { axios } from "@/lib/axios";

export type AgentType = "centers" | "show-rooms";

export interface CenterPayload {
  name: { ar: string; en: string };
  address: { ar: string; en: string };
  description: { ar: string; en: string };
  google_map_link: string;
  phone: string;
  mobile_number: string;
  whatsapp: string;
  type: "centers";
  is_active: boolean;
}

export interface ShowroomPayload {
  name: { ar: string; en: string };
  address: { ar: string; en: string };
  description: { ar: string; en: string };
  google_map_link: string;
  phone: string;
  mobile_number: string;
  whatsapp: string;
  type: "show-rooms";
  is_active: boolean;
}

export interface AgentPayload {
  name: { ar: string; en: string };
  link: string;
  brand_id: number;
  type: AgentType;
  centers?: CenterPayload[];
  showrooms?: ShowroomPayload[];
}

export const addAgent = async (data: AgentPayload) => {
  const response = await axios.post("/admin/agents", data);
  return response.data;
};