import { axios } from "@/lib/axios";

// Vehicle conversation interface
export interface Conversation {
  id: number;
  vehicle_id: number;
  is_active: boolean | number;
  created_at: string;
  is_followed: boolean;
  followers_count: number;
  vehicle?: {
    id: number;
    name: {
      ar: string;
      en: string;
    };
    price: string;
    is_discount: boolean;
    discount_value: string | null;
    discount_date: string | null;
    is_include_tax: boolean;
    is_Insurance_warranty: boolean;
    is_include_warranty: boolean;
    views: number | null;
    is_rent_to_own: boolean;
    rent_to_own_duration: string | null;
    rent_to_own_whatsapp: string | null;
    rent_to_own_price: string | null;
    created_at: string;
    updated_at: string;
    brand: {
      id: number;
      name: {
        ar: string;
        en: string;
      };
    } | null;
    brand_id: number | null;
    agent_id: number | null;
    vehicle_model_id: number | null;
    vehicle_body_type_id: number | null;
    vehicle_type_id: number | null;
    vehicle_class_id: number | null;
    brand_origin_id: number | null;
    number_of_seat_id: number | null;
    engine_type_id: number | null;
    country_id: number | null;
  };
  users_count?: number;
}

// API Response interface for paginated results
export interface ConversationsApiResponse {
  current_page: number;
  data: Conversation[];
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
  links: {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
  };
}

// Fetch all conversations with optional filters
export async function fetchConversations(
  page: number = 1,
  searchTerm: string = ""
): Promise<ConversationsApiResponse> {
  const params: Record<string, string | number | boolean> = { page };

  if (searchTerm) {
    params.search = searchTerm;
  }
  params.with_vehicle = 1;
  const response = await axios.get("/admin/vehicle/conversation", { params });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const raw = response.data as any;

  // Helper to normalize a single conversation item coming from backend
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const normalizeConversation = (item: any): Conversation => {
    const is_active =
      item.is_active === 1 || item.is_active === true
        ? true
        : item.is_active === 0 || item.is_active === false
        ? false
        : Boolean(item.is_active);

    return {
      id: item.id,
      vehicle_id: item.vehicle_id,
      is_active,
      created_at: item.created_at,
      is_followed: Boolean(item.is_followed),
      followers_count: Number(item.followers_count) || 0,
      vehicle: item.vehicle,
      users_count: Number(item.users_count) || 0,
    } as Conversation;
  };

  // Normalize the data array if it exists
  const normalizedData = Array.isArray(raw.data)
    ? raw.data.map(normalizeConversation)
    : [];

  return {
    current_page: raw.current_page || raw.meta?.current_page || 1,
    data: normalizedData,
    first_page_url: raw.first_page_url || raw.links?.first || "",
    from: raw.from || raw.meta?.from || 0,
    last_page: raw.last_page || raw.meta?.last_page || 1,
    last_page_url: raw.last_page_url || raw.links?.last || "",
    next_page_url: raw.next_page_url || raw.links?.next || null,
    path: raw.path || raw.meta?.path || "",
    per_page: raw.per_page || raw.meta?.per_page || 15,
    prev_page_url: raw.prev_page_url || raw.links?.prev || null,
    to: raw.to || raw.meta?.to || 0,
    total: raw.total || raw.meta?.total || 0,
    links: raw.links || {
      first: raw.first_page_url || "",
      last: raw.last_page_url || "",
      prev: raw.prev_page_url || null,
      next: raw.next_page_url || null,
    },
  };
}

// Update conversation active status
export async function updateConversationStatus(
  conversationId: number,
  isActive: boolean
): Promise<void> {
  await axios.patch(`/admin/vehicle/conversation/${conversationId}`, {
    is_active: isActive,
  });
}

// Delete conversation
export async function deleteConversation(
  conversationId: number
): Promise<void> {
  await axios.delete(`/admin/vehicle/conversation/${conversationId}`);
}
