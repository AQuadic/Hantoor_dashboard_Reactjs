import { axios } from "@/lib/axios";

export interface EngineTypes {
  name: {
    ar: string;
    en: string;
  };
}

export interface EngineTypesResponse {
  success?: boolean;
  message?: string;
  data?: Record<string, unknown>;
}

export async function postEngineType(
  payload: EngineTypes
): Promise<EngineTypesResponse> {
  const response = await axios.post(
    "/admin/engine-types",
    { ...payload, is_active: true },
    {}
  );
  return response.data as EngineTypesResponse;
}
