import { axios } from "@/lib/axios";

export interface LoginPayload {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface LoginResponse {
  success?: boolean;
  token?: string;
  access_token?: string;
  user?: Record<string, unknown>;
  message?: string;
}

export async function postLogin(payload: LoginPayload): Promise<LoginResponse> {
  const response = await axios.post("/admin/login", payload);
  return response.data as LoginResponse;
}
