import { axios } from "@/lib/axios";

export interface Country {
  id: number;
  name: {
    ar: string;
    en: string;
  };
}

export interface UserPerCountry {
  user_count: number;
  country: Country | null;
}

export interface VehiclePerCountry {
  vehicle_count: number;
  country: Country;
}

export interface AdminStatsResponse {
  users_count: number;
  brands_count: number;
  agents_count: number;
  search_count: number;
  cars_with_discount_count: number;
  cars_with_offers_count: number;
  cars_with_rent_to_own_count: number;
  users_per_country: UserPerCountry[];
  vehicles_per_country: VehiclePerCountry[];
  [key: string]: any;
}

export const getAdminStats = async (): Promise<AdminStatsResponse> => {
  const response = await axios.get<AdminStatsResponse>("/admin/stats", {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  return response.data;
};