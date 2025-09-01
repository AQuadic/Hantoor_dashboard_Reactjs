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

export interface UpdateBankPayload {
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

export const updateBankById = async (
  id: number,
  payload: UpdateBankPayload
): Promise<ApiResponse> => {
  try {
    const formData = new FormData();

    formData.append("name", JSON.stringify(payload.name));
    formData.append("name[ar]", payload.name.ar);
    formData.append("name[en]", payload.name.en);
    
    formData.append("country_id", payload.country_id.toString());
    formData.append("phone", payload.phone);
    
    if (payload.phone_country) {
      formData.append("phone_country", payload.phone_country);
    }
    
    if (typeof payload.is_active !== "undefined") {
      formData.append("is_active", String(payload.is_active));
    }
    
    if (payload.image) {
      formData.append("image", payload.image);
    }

    if (payload.finance && payload.finance.length > 0) {
      payload.finance.forEach((f, index) => {
        if (f.value) formData.append(`finance[${index}][value]`, f.value);
        if (f.type) formData.append(`finance[${index}][type]`, f.type);
        if (f.salary_from !== undefined) formData.append(`finance[${index}][salary_from]`, f.salary_from.toString());
        if (f.salary_to !== undefined) formData.append(`finance[${index}][salary_to]`, f.salary_to.toString());
        formData.append(`finance[${index}][duration]`, f.duration);
        formData.append(`finance[${index}][employer]`, f.employer);
      });
    }

    console.log("FormData contents:");
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }

    const response = await axios.patch<ApiResponse>(`/admin/banks/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
      },
    });

    return response.data;
  } catch (error: any) {
    console.error("API Error:", error.response?.data);
    return {
      success: false,
      message: error.response?.data?.message || "Something went wrong",
    };
  }
};