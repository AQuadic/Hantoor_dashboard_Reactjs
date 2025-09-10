import { axios } from "@/lib/axios";

export interface UpdateOfferRequest {
  name: {
    ar: string;
    en: string;
  };
  description: {
    ar: string;
    en: string;
  };
  is_active?: boolean;
}

export interface UpdateOfferResponse {
  id: number;
  name: {
    ar: string;
    en: string;
  };
  description: {
    ar: string;
    en: string;
  };
  is_active: boolean;
  image?: {
    url: string;
  };
}

export const updateOffer = async (
  id: number,
  data: UpdateOfferRequest
): Promise<UpdateOfferResponse> => {
  const response = await axios.patch<UpdateOfferResponse>(
    `/admin/vehicle/offer/${id}`,
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
