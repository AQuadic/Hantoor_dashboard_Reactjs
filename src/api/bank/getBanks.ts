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
  image?: string;
  finance?: BankFinance[];
  created_at: string;
  updated_at: string;
}

export interface GetBanksParams {
  country_id?: number;
  pagination?: boolean;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
}

export const getBanks = async (params?: GetBanksParams): Promise<ApiResponse<Bank[]>> => {
  try {
    const response = await axios.get<ApiResponse<Bank[]>>("/admin/banks", {
      params,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    return response.data;
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || "Something went wrong",
      data: [],
    };
  }
};
