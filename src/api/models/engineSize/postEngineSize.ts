import { axios } from "@/lib/axios";

export interface EngineSizes {
  name: {
    ar: string;
    en: string;
  };
}

export interface EngineSizesResponse {
  success?: boolean;
  message?: string;
  data?: Record<string, unknown>;
}

export async function postEngineSize(
  payload: EngineSizes
): Promise<EngineSizesResponse> {
  const response = await axios.post(
    "/admin/vehicle/engine-volume",
    { ...payload, is_active: true },
    {}
  );
  return response.data as EngineSizesResponse;
}
