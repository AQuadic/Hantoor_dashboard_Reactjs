import { axios } from "@/lib/axios";

export interface SetFinancingStatusParams {
  country_id: number;
  is_active: number; // 0 or 1
}

export interface SetFinancingStatusResponse {
  success?: boolean;
  message?: string;
  data?: unknown;
}

export async function setFinancingStatus(
  params: SetFinancingStatusParams
): Promise<SetFinancingStatusResponse> {
  if (![0, 1].includes(params.is_active)) {
    throw new Error("is_active must be 0 or 1");
  }

  const response = await axios.post<SetFinancingStatusResponse>(
    "/admin/financing",
    params,
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );

  return response.data;
}
