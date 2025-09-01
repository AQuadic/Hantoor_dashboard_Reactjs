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
  duration: string | { key: string; label: string }
  employer: string | { key: string; label: string }
  is_active: boolean;
}

export interface CreateBankPayload {
  name: BankName;
  country_id: number;
  phone: string;
  phone_country?: string;
  is_active?: boolean;
  image?: File | null;
  finance?: BankFinance[];
}

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
}

export const createBank = async (
  payload: CreateBankPayload
): Promise<ApiResponse> => {
  try {
    const formData = new FormData();

    // Append bank name
    formData.append("name[ar]", payload.name.ar);
    formData.append("name[en]", payload.name.en);

    formData.append("country_id", String(payload.country_id));
    formData.append("phone", payload.phone);

    if (payload.phone_country) {
      formData.append("phone_country", payload.phone_country);
    }

    // Always send is_active
    formData.append("is_active", payload.is_active ? "1" : "0");

    if (payload.image) {
      formData.append("image", payload.image);
    }

    // Append finance array
    payload.finance?.forEach((fin, index) => {
      if (fin.value) formData.append(`finance[${index}][value]`, String(fin.value));
      if (fin.type) formData.append(`finance[${index}][type]`, String(fin.type));

      // Convert duration and employer to string if they are objects
      const durationStr = typeof fin.duration === "object" ? fin.duration.key : fin.duration;
      const employerStr = typeof fin.employer === "object" ? fin.employer.key : fin.employer;

      formData.append(`finance[${index}][duration]`, durationStr);
      formData.append(`finance[${index}][employer]`, employerStr);

      if (fin.salary_from !== undefined) {
        formData.append(`finance[${index}][salary_from]`, String(fin.salary_from));
      }
      if (fin.salary_to !== undefined) {
        formData.append(`finance[${index}][salary_to]`, String(fin.salary_to));
      }

      // Always include is_active for each finance entry
      formData.append(`finance[${index}][is_active]`, fin.is_active ? "1" : "0");
    });

    const response = await axios.post<ApiResponse>(
      "/admin/banks",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
        },
      }
    );

    return response.data;
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || "Something went wrong",
    };
  }
};