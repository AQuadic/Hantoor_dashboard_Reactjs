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
  link_google_map?: string;
  created_at?: string;
  updated_at?: string;
}

// Main Agent interface
export interface Agent {
  id: number;
  name: AgentName;
  // backend may return 1/0 or boolean; accept both
  is_active: boolean | number;
  link?: string;
  website?: string;
  whatsapp?: string;
  brand_id?: number;
  centers?: AgentCenter[];
  // list endpoint may return counts instead of full centers array
  centers_count?: number;
  show_rooms_count?: number;
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
  website?: string;
  brand_id?: number;
  centers?: {
    [key: number]: {
      name: AgentName;
      description: CenterDescription;
      phone: string;
      whatsapp: string;
      // Backend accepts either the descriptive type or numeric codes ("1" for center, "2" for show_room)
      type: "center" | "show_room" | "1" | "2";
      is_active: string;
    };
  };
}

export interface UpdateAgentPayload
  extends Omit<CreateAgentPayload, "centers"> {
  centers?: AgentCenter[];
}

export interface FetchAgentsParams {
  type?: "center" | "show_room";
  from_date?: string;
  to_date?: string;
}

export async function fetchAgents(
  page: number = 1,
  searchTerm: string = "",
  params?: FetchAgentsParams,
  isPaginated: boolean = true
): Promise<AgentsApiResponse | Agent[]> {
  if (isPaginated) {
  const query: Record<string, string | number> = { page };

  if (searchTerm) query.search = searchTerm;
  if (params?.type) query.type = params.type;
  if (params?.from_date) query.from_date = params.from_date;
  if (params?.to_date) query.to_date = params.to_date;

  const response = await axios.get("/admin/agents", { params: query });
  const raw = response.data as any;

  const normalizeAgent = (item: any): Agent => {
    const name =
      typeof item.name === "string"
        ? { ar: item.name, en: item.name }
        : item.name ?? { ar: "", en: "" };

    const centers = Array.isArray(item.centers)
      ? item.centers.map((c: any) => ({
          ...c,
          name:
            typeof c.name === "string"
              ? { ar: c.name, en: c.name }
              : c.name ?? { ar: "", en: "" },
          description:
            typeof c.description === "string"
              ? { ar: c.description, en: c.description }
              : c.description ?? { ar: "", en: "" },
          type:
            c.type === 1 || c.type === "1"
              ? "center"
              : c.type === 2 || c.type === "2"
              ? "show_room"
              : c.type,
        }))
      : undefined;

    const is_active =
      item.is_active === 1 || item.is_active === true
        ? true
        : item.is_active === 0 || item.is_active === false
        ? false
        : item.is_active;

    return {
      id: item.id,
      name,
      is_active,
      link: item.link,
      website: item.website,
      whatsapp: item.whatsapp,
      brand_id: item.brand_id,
      centers,
      centers_count: item.centers_count,
      show_rooms_count: item.show_rooms_count,
      created_at: item.created_at,
      updated_at: item.updated_at,
    } as Agent;
  };

  return {
    ...raw,
    data: Array.isArray(raw.data) ? raw.data.map(normalizeAgent) : [],
  };
} else {
    let allAgents: Agent[] = [];
    let currentPage = 1;
    let totalPages = 1;

    do {
      const query: Record<string, string | number> = { page: currentPage };
      if (searchTerm) query.search = searchTerm;
      if (params?.type) query.type = params.type;
      if (params?.from_date) query.from_date = params.from_date;
      if (params?.to_date) query.to_date = params.to_date;

      const response = await axios.get("/admin/agents", { params: query });
      const raw = response.data as any;
      const agentsPage: Agent[] = Array.isArray(raw.data)
        ? raw.data.map((item: any) => {
            const name =
              typeof item.name === "string"
                ? { ar: item.name, en: item.name }
                : item.name ?? { ar: "", en: "" };

            const centers = Array.isArray(item.centers)
              ? item.centers.map((c: any) => ({
                  ...c,
                  name:
                    typeof c.name === "string"
                      ? { ar: c.name, en: c.name }
                      : c.name ?? { ar: "", en: "" },
                  description:
                    typeof c.description === "string"
                      ? { ar: c.description, en: c.description }
                      : c.description ?? { ar: "", en: "" },
                  type:
                    c.type === 1 || c.type === "1"
                      ? "center"
                      : c.type === 2 || c.type === "2"
                      ? "show_room"
                      : c.type,
                }))
              : undefined;

            const is_active =
              item.is_active === 1 || item.is_active === true
                ? true
                : item.is_active === 0 || item.is_active === false
                ? false
                : item.is_active;

            return {
              id: item.id,
              name,
              is_active,
              link: item.link,
              website: item.website,
              whatsapp: item.whatsapp,
              brand_id: item.brand_id,
              centers,
              centers_count: item.centers_count,
              show_rooms_count: item.show_rooms_count,
              created_at: item.created_at,
              updated_at: item.updated_at,
            } as Agent;
          })
        : [];

      allAgents = [...allAgents, ...agentsPage];
      totalPages = raw.last_page || 1;
      currentPage++;
    } while (currentPage <= totalPages);

    return allAgents;
  }
}

// Fetch single agent by ID
export async function fetchAgentById(id: number): Promise<Agent> {
  const response = await axios.get(`/admin/agents/${id}`);
  const raw = response.data as any;

  // reuse normalization logic for single agent
  const normalized = ((): Agent => {
    const name =
      typeof raw.name === "string"
        ? { ar: raw.name, en: raw.name }
        : raw.name ?? { ar: "", en: "" };

    const rawCenters = raw.centers ?? raw.service_centers;

    const centers = Array.isArray(rawCenters)
      ? rawCenters.map((c: any) => ({
          ...c,
          name:
            typeof c.name === "string"
              ? { ar: c.name, en: c.name }
              : c.name ?? { ar: "", en: "" },
          description:
            typeof c.description === "string"
              ? { ar: c.description, en: c.description }
              : c.description ?? { ar: "", en: "" },
          type:
            c.type === 1 || c.type === "1"
              ? "center"
              : c.type === 2 || c.type === "2"
              ? "show_room"
              : c.type,
        }))
      : [];

    const is_active =
      raw.is_active === 1 || raw.is_active === true
        ? true
        : raw.is_active === 0 || raw.is_active === false
        ? false
        : raw.is_active;

    return {
      id: raw.id,
      name,
      is_active,
      link: raw.link,
      website: raw.website,
      whatsapp: raw.whatsapp,
      brand_id: raw.brand_id,
      centers,
      centers_count: raw.centers_count,
      show_rooms_count: raw.show_rooms_count,
      created_at: raw.created_at,
      updated_at: raw.updated_at,
    } as Agent;
  })();

  return normalized;
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

// Toggle agent active status
export async function toggleAgentStatus(
  id: number,
  isActive: boolean
): Promise<Agent> {
  const response = await axios.patch(`/admin/agents/${id}`, {
    is_active: isActive,
  });
  return response.data as Agent;
}
