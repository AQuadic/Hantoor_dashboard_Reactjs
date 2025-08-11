import { axios } from "@/lib/axios";

export interface BrandOriginPayload {
  name: {
    ar: string;
    en: string;
  };
}

export interface BrandOriginResponse {
  success?: boolean;
  message?: string;
  data?: Record<string, unknown>;
}

export async function postBrandOrigin(
  payload: BrandOriginPayload
): Promise<BrandOriginResponse> {
  const response = await axios.post(
    "/admin/brand-origin",
    { ...payload, is_active: true },
    {}
  );
  return response.data as BrandOriginResponse;
}
