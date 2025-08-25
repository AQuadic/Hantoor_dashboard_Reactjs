// Shared types for dropdown APIs
import { Brand } from "@/api/brand/fetchBrands";
import { Agent } from "@/api/agents/fetchAgents";
import { Model } from "@/api/models/models/getModels";
import { VehicleBody } from "@/api/models/structureType/getStructure";
import { VehicleType } from "@/api/models/carTypes/getCarTypes";
import { VehicleClass } from "@/api/categories/getCategory";
import { BrandOrigin } from "@/api/models/brandOrigin/getBrandOrigin";
import { numOfSeats } from "@/api/models/seats/getSeats";
import { EngineType } from "@/api/models/engineTypes/getEngineType";
import { EngineSize } from "@/api/models/engineSize/getEnginSize";

export interface Country {
  id: number;
  name: {
    ar: string;
    en: string;
  };
  code: string;
}

export interface DropdownOption {
  id: number | string;
  name: {
    ar: string;
    en: string;
  };
  is_active?: boolean | number;
}

// Re-export types for easier imports
export type {
  Brand,
  Agent,
  Model,
  VehicleBody,
  VehicleType,
  VehicleClass,
  BrandOrigin,
  numOfSeats as NumberOfSeats,
  EngineType,
  EngineSize,
};

// Hook return types
export interface UseDropdownData<T> {
  data: T[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}
