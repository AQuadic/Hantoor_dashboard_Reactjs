import { axios } from "@/lib/axios";

export interface Accessory {
  id: number;
  vehicle_id: number;
  name: { ar: string; en: string };
  price: number;
  is_active: boolean;
  image?: {
    id: number;
    uuid: string;
    size: number;
    url: string;
    responsive_urls: string[];
  };
  created_at?: string;
  updated_at?: string;
}

export interface Offer {
  id: number;
  vehicle_id: number;
  name: { ar: string; en: string };
  description: { ar: string; en: string };
  is_active: boolean;
  image?: {
    id: number;
    uuid: string;
    size: number;
    url: string;
    responsive_urls: string[];
  } | null;
  created_at?: string;
  updated_at?: string;
}

export interface EngineVolume {
  id: number;
  name: { ar: string; en: string };
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface Package {
  id: number;
  vehicle_id: number;
  name: { ar: string; en: string };
  price: number;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface ImagesAd {
  id: number;
  uuid: string;
  url: string;
  size: number;
  responsive_urls: string[];
}

export interface VehicleVideo {
  id: number;
  uuid: string;
  size: number;
  url: string;
  responsive_urls: string[];
  views: number | null;
}

export interface AdditionalImage {
  id: number;
  uuid: string;
  size: number;
  url: string;
  responsive_urls: string[];
}

export interface Vehicle {
  id: number;
  name: { ar: string; en: string };
  country_id: number | null;
  brand_id: number | null;
  agent_id: number | null;
  vehicle_model_id: number | null;
  vehicle_body_type_id: number | null;
  vehicle_type_id: number | null;
  vehicle_class_id: number | null;
  brand_origin_id: number | null;
  number_of_seat_id: number | null;
  engine_type_id: number | null;
  price: string;
  is_discount: boolean | null;
  discount_value: number | null;
  discount_date: string | null;
  is_include_tax: boolean;
  is_Insurance_warranty: boolean;
  is_include_warranty: boolean;
  views: number | null;
  is_rent_to_own: boolean;
  rent_to_own_duration: number | null;
  rent_to_own_whatsapp: string | null;
  rent_to_own_price: string | null;
  created_at: string | null;
  updated_at: string | null;
  is_active: boolean;

  // Arrays
  additional_images: AdditionalImage[];
  image: string | null;
  images_ads: ImagesAd[];
  video?: VehicleVideo | null;
  images: string[];
  features: unknown[];
  offers: Offer[];
  accessories: Accessory[];
  packages: Package[];
  engine_volume?: EngineVolume | null;

  // Related objects (can be null if not loaded)
  brand: {
    id: number;
    name: { ar: string; en: string };
    is_active: boolean;
    created_at: string;
    updated_at: string;
    image: {
      id: number;
      uuid: string;
      size: number;
      url: string;
      responsive_urls: string[];
    };
  } | null;
  agent: unknown | null;
  vehicle_model: {
    name?: { ar?: string; en?: string } | string;
  } | null;
  vehicle_body_type: {
    name?: { ar?: string; en?: string } | string;
  } | null;
  vehicle_type: {
    name?: { ar?: string; en?: string } | string;
  } | null;
  vehicle_class: {
    name?: { ar?: string; en?: string } | string;
  } | null;
  brand_origin: unknown | null;
  number_of_seat: unknown | null;
  engine_type: unknown | null;

  favorites?: number;
  color?: string;
  plate_number?: string;
}
export async function getVehicleById(id: number): Promise<Vehicle> {
  const response = await axios.get<Vehicle>(`/admin/vehicle/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  return response.data;
}