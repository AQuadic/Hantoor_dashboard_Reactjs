import { axios } from "@/lib/axios";

export interface FinancingRequestById {
  id: number;
  bank_name: {
    ar: string;
    en: string;
  };
  phone: string;
  country_id: number;
  is_active: boolean;
  visitor_data: {
    salary_from: string;
    salary_to: string;
    interest_amount: string;
  }[];
  citizen_data: {
    salary_from: string;
    salary_to: string;
    interest_amount: string;
  }[];
  created_at: string;
  updated_at: string;
}

export const getRequestFinancingById = async (id: number): Promise<FinancingRequestById[]> => {
  try {
    const response = await axios.get(`/admin/request-financing/${id}`);
    return (response.data as { data: FinancingRequestById[] }).data;
  } catch (error: any) {
    console.error("Error fetching financing requests:", error);
    throw new Error(error?.response?.data?.message || "Failed to fetch financing requests");
  }
};
