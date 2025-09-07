import { axios } from "@/lib/axios";

export interface ResendRequest {
  email?: string;
  phone?: string;
  phone_country?: string;
  type: "verify" | "new";
}

export interface ResendResponse {
  message: string;
  [key: string]: any;
}

export const resend = async (
  data: ResendRequest
): Promise<ResendResponse> => {
  const response = await axios.post<ResendResponse>(
    "/admin/resend",
    data,
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );

  return response.data;
};