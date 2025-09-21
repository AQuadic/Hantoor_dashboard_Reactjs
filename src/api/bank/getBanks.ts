import { axios } from "@/lib/axios";

export interface BankName {
  ar: string;
  en: string;
}

export interface BankFinance {
  value?: string;
  type?: "citizen" | "expatriate";
  salary_from?: number;
  salary_to?: number;
  duration: string;
  employer: string;
}

export interface Bank {
  id: number;
  name: BankName;
  country_id: number;
  phone: string;
  phone_country?: string;
  is_active: boolean;
  image?: { id: number; uuid: string; url: string; size?: number } | string;
  citizens?: BankFinance[];
  expatriates?: BankFinance[];
  created_at: string;
  updated_at: string;
}

export interface GetBanksParams {
  country_id?: number;
  pagination?: boolean;
  page?: number;
  search?: string;
  from_date?: string;
  to_date?: string;
}

export interface PaginationMeta {
  current_page: number;
  data: Bank[];
  first_page_url?: string;
  from?: number;
  last_page: number;
  last_page_url?: string;
  links?: unknown[];
  next_page_url?: string | null;
  path?: string;
  per_page: number;
  prev_page_url?: string | null;
  to?: number;
  total: number;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
}

export const getBanks = async (
  params?: GetBanksParams
): Promise<PaginationMeta | Bank[]> => {
  try {
    const response = await axios.get<PaginationMeta | Bank[]>("/admin/banks", {
      params,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    return response.data;
  } catch (error) {
    // keep the error available for debugging if needed
    console.error(error);
    // On error, return an empty array so callers can handle the empty state
    return [];
  }
};
