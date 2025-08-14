import { axios } from "@/lib/axios";

// Base interfaces for agent data
export interface AgentName {
  ar: string;
  en: string;
}

export interface CenterDescription {
  ar: string;
  en: string;
}

// Center/Showroom interface
export interface AgentCenter {
  id?: number;
  is_active: string;
  phone: string;
  type: "center" | "show_room";
  whatsapp: string;
  name: AgentName;
  description: CenterDescription;
  created_at?: string;
  updated_at?: string;
}

// Main Agent interface
export interface Agent {
  id: number;
  name: AgentName;
  is_active: boolean;
  link?: string;
  brand_id?: number;
  centers?: AgentCenter[];
  created_at?: string;
  updated_at?: string;
}

// API Response interface for paginated results
export interface AgentsApiResponse {
  current_page: number;
  data: Agent[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

// Request payload for creating/updating agents
export interface CreateAgentPayload {
  name: AgentName;
  is_active?: string;
  link?: string;
  brand_id?: number;
  centers?: {
    [key: number]: {
      name: AgentName;
      description: CenterDescription;
      phone: string;
      whatsapp: string;
      type: "center" | "show_room";
      is_active: string;
    };
  };
}

export interface UpdateAgentPayload
  extends Omit<CreateAgentPayload, "centers"> {
  centers?: AgentCenter[];
}

// Fetch all agents with optional filters
export async function fetchAgents(
  page: number = 1,
  searchTerm: string = "",
  type?: "center" | "show_room"
): Promise<AgentsApiResponse> {
  const params: Record<string, string | number> = { page };

  if (searchTerm) {
    params.search = searchTerm;
  }

  if (type) {
    params.type = type;
  }

  const response = await axios.get("/admin/agents", { params });
  return response.data as AgentsApiResponse;
}

// Fetch single agent by ID
export async function fetchAgentById(id: number): Promise<Agent> {
  const response = await axios.get(`/admin/agents/${id}`);
  return response.data as Agent;
}

// Create new agent
export async function createAgent(data: CreateAgentPayload): Promise<Agent> {
  const response = await axios.post("/admin/agents", data);
  return response.data as Agent;
}

// Update existing agent
export async function updateAgent(
  id: number,
  data: UpdateAgentPayload
): Promise<Agent> {
  const response = await axios.put(`/admin/agents/${id}`, data);
  return response.data as Agent;
}

// Delete agent
export async function deleteAgent(id: number): Promise<void> {
  await axios.delete(`/admin/agents/${id}`);
}
