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
  message: string;
  data?: T;
}

export async function updateBankById(
  id: number,
  data: UpdateBankPayload
): Promise<ApiResponse> {
  const formData = new FormData();

  const fields: { key: string; value?: any }[] = [
    { key: "name[ar]", value: data.name.ar },
    { key: "name[en]", value: data.name.en },
    { key: "country_id", value: data.country_id },
    { key: "phone", value: data.phone },
    { key: "phone_country", value: data.phone_country },
    { key: "is_active", value: data.is_active },
  ];

  fields.forEach(({ key, value }) => {
    if (value !== undefined && value !== null && value !== "") {
      formData.append(key, value.toString());
    }
  });

  if (data.image) {
    formData.append("image", data.image);
  }

  if (data.finance && data.finance.length > 0) {
    data.finance.forEach((f, index) => {
      const financeFields: { key: string; value?: any }[] = [
        { key: `finance[${index}][value]`, value: f.value },
        { key: `finance[${index}][type]`, value: f.type },
        { key: `finance[${index}][salary_from]`, value: f.salary_from },
        { key: `finance[${index}][salary_to]`, value: f.salary_to },
        { key: `finance[${index}][duration]`, value: f.duration },
        { key: `finance[${index}][employer]`, value: f.employer },
      ];

      financeFields.forEach(({ key, value }) => {
        if (value !== undefined && value !== null && value !== "") {
          formData.append(key, value.toString());
        }
      });
    });
  }

  // add put method
  formData.append("_method", "put");

  const response = await axios.post<ApiResponse>(`/admin/banks/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Accept: "application/json",
    },
  });

  return response.data;
}
