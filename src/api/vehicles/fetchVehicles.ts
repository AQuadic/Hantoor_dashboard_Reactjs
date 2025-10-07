import { axios } from "@/lib/axios";

// Import existing types to avoid conflicts
import { VehicleType } from "@/api/models/carTypes/getCarTypes";
import { VehicleClass } from "@/api/categories/getCategory";
import { BrandOrigin } from "@/api/models/brandOrigin/getBrandOrigin";
import { EngineType } from "@/api/models/engineTypes/getEngineType";
import { VehicleBody as VehicleBodyType } from "@/api/models/structureType/getStructure";
import { numOfSeats as NumberOfSeat } from "@/api/models/seats/getSeats";

// Base interfaces for vehicle data
export interface VehicleName {
  ar: string;
  en: string;
}

// Helper function to get vehicle name from string or VehicleName object
export function getVehicleName(name: string | VehicleName): string {
  if (typeof name === "string") {
    return name;
  }
  return name.ar || name.en || "";
}

export interface VehicleDescription {
  ar: string;
  en: string;
}
export type UpdateVehiclePayload = CreateVehiclePayload & {
  id: number;
}; // Vehicle sub-entities interfaces
export interface VehicleFeature {
  id?: number;
  vehicle_id?: number;
  name: VehicleName;
  description: VehicleDescription;
  is_active: boolean;
  image?: File | string | null;
  created_at?: string;
  updated_at?: string;
  discount_from_date?: string;
  discount_to_date?: string;
}

export interface VehicleOffer {
  id?: number;
  vehicle_id?: number;
  name: VehicleName;
  description: VehicleDescription;
  is_active: boolean;
  image?: File | string | null;
  created_at?: string;
  updated_at?: string;
}

export interface VehicleAccessory {
  id?: number;
  vehicle_id?: number;
  name: VehicleName;
  price: string;
  is_active: boolean;
  image?: File | string | null;
  created_at?: string;
  updated_at?: string;
}

export interface VehiclePackage {
  id?: number;
  vehicle_id?: number;
  name: VehicleName;
  price: string;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface VehicleImage {
  id?: number;
  image: File | string;
}

export interface VehicleImageObject {
  id: number;
  uuid: string;
  size: number;
  url: string;
  responsive_urls: string[];
}

export interface VehicleBrand {
  id: number;
  name: VehicleName;
  is_active: number;
  created_at: string;
  updated_at: string;
  image: VehicleImageObject | null;
}

export interface VehicleAgent {
  id: number;
  name: VehicleName;
  website: string | null;
  brand_id: number;
  is_active: number;
  link?: string;
  created_at: string | null;
  updated_at: string;
}

export interface VehicleModel {
  id: number;
  name: VehicleName;
  agent_id: number;
  is_active: number;
  created_at: string;
  updated_at: string;
}

// Main Vehicle interface
export interface Vehicle {
  id: number;
  name: string | VehicleName; // API returns name as string OR VehicleName object
  country_id: number;
  brand_id: number;
  agent_id: number;
  vehicle_model_id: number;
  vehicle_body_type_id: number;
  vehicle_type_id: number;
  vehicle_class_id: number;
  brand_origin_id: number;
  number_of_seat_id: number;
  engine_type_id: number;
  engine_volume_id?: number; // Added as it might be present in some responses
  price: string;
  is_discount: boolean | null;
  discount_value: string | number | null;
  discount_date: string | null;
  discount_from_date?: string | null;
  discount_to_date?: string | null;
  is_include_tax: boolean;
  is_Insurance_warranty: boolean;
  is_include_warranty: boolean;
  views: number | null;
  is_rent_to_own: boolean;
  rent_to_own_duration: number | string | VehicleName | null;
  rent_to_own_whatsapp: string | null;
  rent_to_own_phone_country?: string | null;
  rent_to_own_price: string | null;
  is_active?: boolean; // Status field for vehicle activation
  status?: number; // Backend status field (1 for active, 0 for inactive)
  created_at: string | null;
  updated_at: string | null;
  favorites_count?: number;
  is_favorite?: boolean;

  // Related data - updated to match actual API response
  additional_images: VehicleImageObject[];
  image: VehicleImageObject | null;
  images_ads: VehicleImageObject[];
  video: VehicleImageObject | null;
  images?: VehicleImage[];
  features: VehicleFeature[];
  offers: VehicleOffer[];
  accessories: VehicleAccessory[];
  packages: VehiclePackage[];
  brand: VehicleBrand | null;
  agent: VehicleAgent | null;
  vehicle_model: VehicleModel | null;
  vehicle_body_type: VehicleBodyType | null;
  vehicle_type: VehicleType | null;
  vehicle_class: VehicleClass | null;
  brand_origin: BrandOrigin | null;
  number_of_seat: NumberOfSeat | null;
  engine_type: EngineType | null;
  engine_volume?: {
    id: number;
    name: VehicleName;
    is_active: number;
    created_at: string;
    updated_at: string;
  } | null;
  country?: {
    id: number;
    tenant_id: string | null;
    name: VehicleName;
    code: string;
    currency: string | null;
    usd_rate: string | null;
    tax_rate: string | null;
    language_code: string | null;
    boundaries: string | null;
    shipping_service_ids: string | null;
    shipping_provider: string | null;
    created_at: string;
    updated_at: string;
    is_active: boolean;
    currency_text: VehicleName;
    service_fee: string;
    service_duration: string;
    service_duration_type: string;
  } | null;
}

// API Response interface for paginated results
export interface VehiclesApiResponse {
  current_page: number;
  data: Vehicle[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links?: Array<{
    url: string | null;
    label: string;
    active: boolean;
  }>;
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
  filters_applied?: Record<
    string,
    string | number | boolean | string[] | number[]
  >;
}

// Wrapper interface for the actual API response with success field
export interface VehiclesApiResponseWrapper {
  success: boolean;
  data: VehiclesApiResponse;
}

// Filters interface for GET requests
export interface VehicleFilters {
  country_id?: number;
  brand_id?: number[];
  seats?: number[];
  agent_id?: number[];
  vehicle_type_id?: number[];
  engine_volume_id?: number;
  vehicle_model_id?: number[];
  vehicle_body_type_id?: number[];
  is_offer?: boolean;
  is_discount?: boolean;
  price_from?: number;
  price_to?: number;
  price_range?: "under_500" | "500_to_800" | "above_800";
  vehicle_class_id?: number[];
  sort_by?: "price" | "vehicle_model_id" | "created_at" | "brand_id";
  sort_order?: "asc" | "desc";
  per_page?: number;
  search?: string;
  search_type?: string;
  order_by?: "new" | "low_price" | "high_price";
  is_active?: boolean;
  from_date?: string;
  to_date?: string;
}

// Request payload for creating vehicles (using FormData for file uploads)
export interface CreateVehiclePayload {
  name: VehicleName;
  country_id?: string;
  brand_id?: string;
  agent_id?: string;
  vehicle_model_id?: string;
  vehicle_body_type_id?: string;
  vehicle_type_id?: string;
  vehicle_class_id?: string;
  brand_origin_id?: string;
  number_of_seat_id?: string;
  engine_type_id?: string;
  engine_volume_id?: string;
  price?: string;
  is_discount?: boolean;
  discount_value?: string;
  discount_date?: string;
  discount_from_date?: string;
  discount_to_date?: string;
  is_include_tax?: boolean;
  is_Insurance_warranty?: boolean;
  is_include_warranty?: boolean;
  is_rent_to_own?: boolean;
  rent_to_own_duration?: string | null;
  "rent_to_own_duration[ar]"?: string | null;
  "rent_to_own_duration[en]"?: string | null;
  rent_to_own_whatsapp?: string | null;
  rent_to_own_phone_country?: string | null;
  rent_to_own_price?: string | null;
  is_active?: boolean;
  status?: string; // Status field as string for FormData

  // Files
  image?: File;
  video?: File;
  images?: VehicleImage[];
  additional_images?: VehicleImage[];
  ads_images?: VehicleImage[];

  // Sub-entities
  offers?: VehicleOffer[];
  packages?: VehiclePackage[];
  features?: VehicleFeature[];
  accessories?: VehicleAccessory[];
}

// Fetch all vehicles with optional filters
export async function fetchVehicles(
  page: number = 1,
  filters: VehicleFilters = {}
): Promise<VehiclesApiResponse> {
  const params: Record<
    string,
    string | number | boolean | (string | number)[]
  > = {
    page,
    per_page: filters.per_page || 10,
  };

  // Add individual filter parameters only if they have values
  if (filters.country_id !== undefined) {
    params.country_id = filters.country_id;
  }
  if (filters.engine_volume_id !== undefined) {
    params.engine_volume_id = filters.engine_volume_id;
  }
  if (filters.price_from !== undefined) {
    params.price_from = filters.price_from;
  }
  if (filters.price_to !== undefined) {
    params.price_to = filters.price_to;
  }
  if (filters.price_range) {
    params.price_range = filters.price_range;
  }
  if (filters.sort_by) {
    params.sort_by = filters.sort_by;
  }
  if (filters.sort_order) {
    params.sort_order = filters.sort_order;
  }
  if (filters.search && filters.search.trim() !== "") {
    params.search = filters.search.trim();
  }
  if (filters.search_type) {
    params.search_type = filters.search_type;
  }
  if (filters.order_by) {
    params.order_by = filters.order_by;
  }
  if (filters.is_active !== undefined) {
    params.is_active = filters.is_active ? 1 : 0;
  }
  if (filters.is_offer !== undefined) {
    params.is_offer = filters.is_offer ? 1 : 0;
  }
  if (filters.is_discount !== undefined) {
    params.is_discount = filters.is_discount ? 1 : 0;
  }

  // Handle array parameters
  if (filters.brand_id?.length) {
    params.brand_id = filters.brand_id;
  }
  if (filters.seats?.length) {
    params.seats = filters.seats;
  }
  if (filters.agent_id?.length) {
    params.agent_id = filters.agent_id;
  }
  if (filters.vehicle_type_id?.length) {
    params.vehicle_type_id = filters.vehicle_type_id;
  }
  if (filters.vehicle_model_id?.length) {
    params.vehicle_model_id = filters.vehicle_model_id;
  }
  if (filters.vehicle_body_type_id?.length) {
    params.vehicle_body_type_id = filters.vehicle_body_type_id;
  }
  if (filters.vehicle_class_id?.length) {
    params.vehicle_class_id = filters.vehicle_class_id;
  }
  if (filters.from_date) {
    params.from_date = filters.from_date;
  }
  if (filters.to_date) {
    params.to_date = filters.to_date;
  }

  const response = await axios.get("/admin/vehicle", { params });
  const responseData = response.data as VehiclesApiResponseWrapper;

  // Extract the nested data from the wrapper
  return responseData.data;
}

// Wrapper interface for single vehicle response
export interface VehicleApiResponseWrapper {
  success: boolean;
  data: Vehicle;
}

// Fetch single vehicle by ID
export async function fetchVehicleById(id: number): Promise<Vehicle> {
  const response = await axios.get(`/admin/vehicle/${id}`);

  // Check if response has a wrapped structure with data field
  if (
    response.data &&
    typeof response.data === "object" &&
    "data" in response.data
  ) {
    const responseData = response.data as VehicleApiResponseWrapper;
    return responseData.data;
  }

  // Otherwise, assume the response is the vehicle object directly
  return response.data as Vehicle;
}

// Create new vehicle
export async function createVehicle(
  data: CreateVehiclePayload
): Promise<Vehicle> {
  const formData = new FormData();

  // Add basic vehicle data
  if (data.name) {
    formData.append("name[ar]", data.name.ar);
    formData.append("name[en]", data.name.en);
  }

  // Add all scalar fields
  const scalarFields = [
    "country_id",
    "brand_id",
    "agent_id",
    "vehicle_model_id",
    "vehicle_body_type_id",
    "vehicle_type_id",
    "vehicle_class_id",
    "brand_origin_id",
    "number_of_seat_id",
    "engine_type_id",
    "engine_volume_id",
    "price",
    "discount_value",
    "discount_from_date",
    "discount_to_date",
    "discount_date",
    "rent_to_own_whatsapp",
    "rent_to_own_phone_country",
    "rent_to_own_price",
  ];

  scalarFields.forEach((field) => {
    const value = data[field as keyof CreateVehiclePayload];
    if (value !== undefined && value !== null && value !== "") {
      formData.append(field, String(value));
    }
  });

  // Add localized rent_to_own_duration fields
  if (data["rent_to_own_duration[ar]"]) {
    formData.append(
      "rent_to_own_duration[ar]",
      data["rent_to_own_duration[ar]"]
    );
  }
  if (data["rent_to_own_duration[en]"]) {
    formData.append(
      "rent_to_own_duration[en]",
      data["rent_to_own_duration[en]"]
    );
  }

  // Add boolean fields
  if (data.is_discount !== undefined) {
    formData.append("is_discount", data.is_discount ? "1" : "0");
  }
  if (data.is_include_tax !== undefined) {
    formData.append("is_include_tax", data.is_include_tax ? "1" : "0");
  }
  if (data.is_Insurance_warranty !== undefined) {
    formData.append(
      "is_Insurance_warranty",
      data.is_Insurance_warranty ? "1" : "0"
    );
  }
  if (data.is_include_warranty !== undefined) {
    formData.append(
      "is_include_warranty",
      data.is_include_warranty ? "1" : "0"
    );
  }
  if (data.is_rent_to_own !== undefined) {
    formData.append("is_rent_to_own", data.is_rent_to_own ? "1" : "0");
  }

  // Add files
  if (data.image) {
    formData.append("image", data.image);
  }
  if (data.video) {
    formData.append("video", data.video);
  }
  // Add image arrays
  if (data.images?.length) {
    data.images.forEach((img, index) => {
      if (img.image instanceof File) {
        formData.append(`images[${index}][image]`, img.image);
      }
    });
  }

  if (data.additional_images?.length) {
    data.additional_images.forEach((img, index) => {
      if (img.image instanceof File) {
        formData.append(`additional_images[${index}][image]`, img.image);
      }
    });
  }

  if (data.ads_images?.length) {
    data.ads_images.forEach((img, index) => {
      if (img.image instanceof File) {
        formData.append(`ads_images[${index}][image]`, img.image);
      }
    });
  }

  // Add offers
  if (data.offers?.length) {
    data.offers.forEach((offer, index) => {
      formData.append(`offers[${index}][name][ar]`, offer.name.ar);
      formData.append(`offers[${index}][name][en]`, offer.name.en);
      formData.append(
        `offers[${index}][description][ar]`,
        offer.description.ar
      );
      formData.append(
        `offers[${index}][description][en]`,
        offer.description.en
      );
      formData.append(
        `offers[${index}][is_active]`,
        offer.is_active ? "1" : "0"
      );
      if (offer.image instanceof File) {
        formData.append(`offers[${index}][image]`, offer.image);
      }
    });
  }

  // Add packages
  if (data.packages?.length) {
    data.packages.forEach((pkg, index) => {
      formData.append(`packages[${index}][name][ar]`, pkg.name.ar);
      formData.append(`packages[${index}][name][en]`, pkg.name.en);
      formData.append(`packages[${index}][price]`, pkg.price);
      formData.append(
        `packages[${index}][is_active]`,
        pkg.is_active ? "1" : "0"
      );
    });
  }

  // Add features
  if (data.features?.length) {
    data.features.forEach((feature, index) => {
      formData.append(`features[${index}][name][ar]`, feature.name.ar);
      formData.append(`features[${index}][name][en]`, feature.name.en);
      formData.append(
        `features[${index}][description][ar]`,
        feature.description.ar
      );
      formData.append(
        `features[${index}][description][en]`,
        feature.description.en
      );
      formData.append(
        `features[${index}][is_active]`,
        feature.is_active ? "1" : "0"
      );
      if (feature.image instanceof File) {
        formData.append(`features[${index}][image]`, feature.image);
      }
    });
  }

  // Add accessories
  if (data.accessories?.length) {
    data.accessories.forEach((accessory, index) => {
      formData.append(`accessories[${index}][name][ar]`, accessory.name.ar);
      formData.append(`accessories[${index}][name][en]`, accessory.name.en);
      formData.append(`accessories[${index}][price]`, accessory.price);
      formData.append(
        `accessories[${index}][is_active]`,
        accessory.is_active ? "1" : "0"
      );
      if (accessory.image instanceof File) {
        formData.append(`accessories[${index}][image]`, accessory.image);
      }
    });
  }

  const response = await axios.post("/admin/vehicle", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  const responseData = response.data as VehicleApiResponseWrapper;
  return responseData.data;
}

// Update existing vehicle
export async function updateVehicle(
  id: number,
  data: UpdateVehiclePayload
): Promise<Vehicle> {
  try {
    const formData = new FormData();

    // Add method override for PUT
    formData.append("_method", "PUT");

    // Add basic vehicle data
    if (data.name) {
      formData.append("name[ar]", data.name.ar);
      formData.append("name[en]", data.name.en);
    }

    // Add all scalar fields
    const scalarFields = [
      "country_id",
      "brand_id",
      "agent_id",
      "vehicle_model_id",
      "vehicle_body_type_id",
      "vehicle_type_id",
      "vehicle_class_id",
      "brand_origin_id",
      "number_of_seat_id",
      "engine_type_id",
      "engine_volume_id",
      "price",
      "discount_value",
      "discount_date",
      "discount_from_date",
      "discount_to_date",
      "rent_to_own_whatsapp",
      "rent_to_own_phone_country",
      "rent_to_own_price",
    ];

    scalarFields.forEach((field) => {
      const value = data[field as keyof UpdateVehiclePayload];
      if (value !== undefined && value !== null && value !== "") {
        formData.append(field, String(value));
      }
    });

    // Add localized rent_to_own_duration fields
    if (data["rent_to_own_duration[ar]"]) {
      formData.append(
        "rent_to_own_duration[ar]",
        data["rent_to_own_duration[ar]"]
      );
    }
    if (data["rent_to_own_duration[en]"]) {
      formData.append(
        "rent_to_own_duration[en]",
        data["rent_to_own_duration[en]"]
      );
    }

    // Add boolean fields
    if (data.is_discount !== undefined) {
      formData.append("is_discount", data.is_discount ? "1" : "0");
    }
    if (data.is_include_tax !== undefined) {
      formData.append("is_include_tax", data.is_include_tax ? "1" : "0");
    }
    if (data.is_Insurance_warranty !== undefined) {
      formData.append(
        "is_Insurance_warranty",
        data.is_Insurance_warranty ? "1" : "0"
      );
    }
    if (data.is_include_warranty !== undefined) {
      formData.append(
        "is_include_warranty",
        data.is_include_warranty ? "1" : "0"
      );
    }
    if (data.is_rent_to_own !== undefined) {
      formData.append("is_rent_to_own", data.is_rent_to_own ? "1" : "0");
    }

    // Add files
    if (data.image) {
      formData.append("image", data.image);
    }
    if (data.video) {
      formData.append("video", data.video);
    }

    // Add image arrays
    if (data.images?.length) {
      data.images.forEach((img, index) => {
        if (img.image instanceof File) {
          formData.append(`images[${index}][image]`, img.image);
        }
      });
    }

    if (data.additional_images?.length) {
      data.additional_images.forEach((img, index) => {
        if (img.image instanceof File) {
          formData.append(`additional_images[${index}][image]`, img.image);
        }
      });
    }

    if (data.ads_images?.length) {
      data.ads_images.forEach((img, index) => {
        if (img.image instanceof File) {
          formData.append(`ads_images[${index}][image]`, img.image);
        }
      });
    }

    // Add offers
    if (data.offers?.length) {
      data.offers.forEach((offer, index) => {
        formData.append(`offers[${index}][name][ar]`, offer.name.ar);
        formData.append(`offers[${index}][name][en]`, offer.name.en);
        formData.append(
          `offers[${index}][description][ar]`,
          offer.description.ar
        );
        formData.append(
          `offers[${index}][description][en]`,
          offer.description.en
        );
        formData.append(
          `offers[${index}][is_active]`,
          offer.is_active ? "1" : "0"
        );
        if (offer.image instanceof File) {
          formData.append(`offers[${index}][image]`, offer.image);
        }
      });
    }

    // Add packages
    if (data.packages?.length) {
      data.packages.forEach((pkg, index) => {
        formData.append(`packages[${index}][name][ar]`, pkg.name.ar);
        formData.append(`packages[${index}][name][en]`, pkg.name.en);
        formData.append(`packages[${index}][price]`, pkg.price);
        formData.append(
          `packages[${index}][is_active]`,
          pkg.is_active ? "1" : "0"
        );
      });
    }

    // Add features
    if (data.features?.length) {
      data.features.forEach((feature, index) => {
        formData.append(`features[${index}][name][ar]`, feature.name.ar);
        formData.append(`features[${index}][name][en]`, feature.name.en);
        formData.append(
          `features[${index}][description][ar]`,
          feature.description.ar
        );
        formData.append(
          `features[${index}][description][en]`,
          feature.description.en
        );
        formData.append(
          `features[${index}][is_active]`,
          feature.is_active ? "1" : "0"
        );
        if (feature.image instanceof File) {
          formData.append(`features[${index}][image]`, feature.image);
        }
      });
    }

    // Add accessories
    if (data.accessories?.length) {
      data.accessories.forEach((accessory, index) => {
        formData.append(`accessories[${index}][name][ar]`, accessory.name.ar);
        formData.append(`accessories[${index}][name][en]`, accessory.name.en);
        formData.append(`accessories[${index}][price]`, accessory.price);
        formData.append(
          `accessories[${index}][is_active]`,
          accessory.is_active ? "1" : "0"
        );
        if (accessory.image instanceof File) {
          formData.append(`accessories[${index}][image]`, accessory.image);
        }
      });
    }

    const response = await axios.post(`/admin/vehicle/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    const responseData = response.data as VehicleApiResponseWrapper;
    return responseData.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to update vehicle"
    );
  }
}

// Delete vehicle
export async function deleteVehicle(id: number): Promise<void> {
  await axios.delete(`/admin/vehicle/${id}`);
}

// Toggle vehicle status (if needed)
export async function toggleVehicleStatus(
  id: number,
  isActive: boolean
): Promise<Vehicle> {
  // Send a PATCH request with JSON payload (is_active as numeric 1/0)
  const payload = { is_active: isActive ? 1 : 0, _method: "PATCH" };

  const response = await axios.post(`/admin/vehicle/${id}`, payload);
  const responseData = response.data as VehicleApiResponseWrapper;
  return responseData.data;
}
