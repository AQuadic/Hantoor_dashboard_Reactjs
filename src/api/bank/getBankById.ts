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
  is_active: boolean;
}

export interface Bank {
  id: number;
  name: BankName;
  country_id: number;
  phone: string;
  phone_country?: string;
  is_active: boolean;
  image?: string | null;
  finance?: BankFinance[];
  created_at: string;
  updated_at: string;
}

export const getBankById = async (id: number): Promise<Bank> => {
  try {
    const response = await axios.get<Bank>(`/admin/banks/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Something went wrong");
  }
};