import { useQuery } from "@tanstack/react-query";
import { fetchBrands } from "@/api/brand/fetchBrands";
import { fetchAgents } from "@/api/agents/fetchAgents";
import { getModels } from "@/api/models/models/getModels";
import { getVehicleBodies } from "@/api/models/structureType/getStructure";
import {
  getVehicleTypes,
  GetVehicleTypesResponse as GetVehicleTypesResponseAPI,
} from "@/api/models/carTypes/getCarTypes";
import {
  getVehicleClasses,
  GetVehicleClassesPaginated as GetVehicleClassesPaginatedAPI,
} from "@/api/categories/getCategory";
import { getBrandOrigin } from "@/api/models/brandOrigin/getBrandOrigin";
import { getSeats } from "@/api/models/seats/getSeats";
import { getEngineType } from "@/api/models/engineTypes/getEngineType";
import { getEngineSize } from "@/api/models/engineSize/getEnginSize";
import { arabicCountryNames } from "@/constants/arabicCountryNames";
import type {
  Brand,
  Agent,
  Model,
  VehicleBody,
  VehicleType,
  VehicleClass,
  BrandOrigin,
  NumberOfSeats,
  EngineType,
  EngineSize,
  Country,
  UseDropdownData,
} from "@/types/dropdown";

// Countries hook - using static data from constants
export const useCountries = (): UseDropdownData<Country> => {
  const countriesData: Country[] = Object.entries(arabicCountryNames).map(
    ([code, arName], index) => ({
      id: index + 1,
      code,
      name: {
        ar: arName,
        en: code, // Using country code as English name for now
      },
    })
  );

  return {
    data: countriesData,
    isLoading: false,
    error: null,
    refetch: () => {},
  };
};

// Brands hook
export const useBrands = (): UseDropdownData<Brand> => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["brands"],
    queryFn: () => fetchBrands(1, ""),
    select: (response) => response.data || [],
  });

  return {
    data: data || [],
    isLoading,
    error: error as Error | null,
    refetch,
  };
};

// Agents hook
export const useAgents = (): UseDropdownData<Agent> => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["agents"],
    queryFn: () => fetchAgents(1, ""),
    select: (response) => response.data || [],
  });

  return {
    data: data || [],
    isLoading,
    error: error as Error | null,
    refetch,
  };
};

// Models hook
export const useModels = (): UseDropdownData<Model> => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["models"],
    queryFn: () => getModels(1, 100, ""), // Get first 100 models
    select: (response) => response.data || [],
  });

  return {
    data: data || [],
    isLoading,
    error: error as Error | null,
    refetch,
  };
};

// Vehicle Bodies (Structure Type) hook
export const useVehicleBodies = (): UseDropdownData<VehicleBody> => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["vehicleBodies"],
    queryFn: () => getVehicleBodies({ pagination: false }),
    select: (response) => response.data || [],
  });

  return {
    data: data || [],
    isLoading,
    error: error as Error | null,
    refetch,
  };
};

// Vehicle Types hook
export const useVehicleTypes = (
  brandId?: string | number
): UseDropdownData<VehicleType> => {
  const parsedBrandId =
    brandId !== undefined && brandId !== null && brandId !== ""
      ? Number(brandId)
      : undefined;

  const { data, isLoading, error, refetch } = useQuery<
    GetVehicleTypesResponseAPI,
    Error,
    VehicleType[]
  >({
    queryKey: ["vehicleTypes", parsedBrandId ?? "all"],
    queryFn: () =>
      getVehicleTypes({ pagination: false, brand_id: parsedBrandId }),
    select: (response) =>
      Array.isArray(response) ? response : response.data || [],
    enabled: parsedBrandId !== undefined, // only fetch when brand provided
  });

  return {
    data: data || [],
    isLoading,
    error: error as Error | null,
    refetch,
  };
};

// Vehicle Classes (Categories) hook
export const useVehicleClasses = (): UseDropdownData<VehicleClass> => {
  const { data, isLoading, error, refetch } = useQuery<
    GetVehicleClassesPaginatedAPI | VehicleClass[],
    Error,
    VehicleClass[]
  >({
    queryKey: ["vehicleClasses"],
    queryFn: () => getVehicleClasses(),
    select: (response) =>
      Array.isArray(response) ? response : response.data || [],
  });

  return {
    data: data || [],
    isLoading,
    error: error as Error | null,
    refetch,
  };
};

// Brand Origins hook
export const useBrandOrigins = (): UseDropdownData<BrandOrigin> => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["brandOrigins"],
    queryFn: () => getBrandOrigin(),
  });

  return {
    data: data || [],
    isLoading,
    error: error as Error | null,
    refetch,
  };
};

// Seats hook
export const useSeats = (): UseDropdownData<NumberOfSeats> => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["seats"],
    queryFn: () => getSeats(),
  });

  return {
    data: data || [],
    isLoading,
    error: error as Error | null,
    refetch,
  };
};

// Engine Types hook
export const useEngineTypes = (): UseDropdownData<EngineType> => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["engineTypes"],
    queryFn: () => getEngineType(),
  });

  return {
    data: data || [],
    isLoading,
    error: error as Error | null,
    refetch,
  };
};

// Engine Sizes hook
export const useEngineSizes = (): UseDropdownData<EngineSize> => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["engineSizes"],
    queryFn: () => getEngineSize(),
  });

  return {
    data: data || [],
    isLoading,
    error: error as Error | null,
    refetch,
  };
};

// Combined hook for all dropdown data
export const useAllDropdownData = () => {
  const countries = useCountries();
  const brands = useBrands();
  const agents = useAgents();
  const models = useModels();
  // vehicleTypes can be requested with an optional brand id via the hook below
  const vehicleTypes = useVehicleTypes();
  const vehicleClasses = useVehicleClasses();
  const brandOrigins = useBrandOrigins();
  const seats = useSeats();
  const engineTypes = useEngineTypes();
  const engineSizes = useEngineSizes();

  const isLoading =
    countries.isLoading ||
    brands.isLoading ||
    agents.isLoading ||
    models.isLoading ||
    vehicleTypes.isLoading ||
    vehicleClasses.isLoading ||
    brandOrigins.isLoading ||
    seats.isLoading ||
    engineTypes.isLoading ||
    engineSizes.isLoading;

  const hasError =
    countries.error ||
    brands.error ||
    agents.error ||
    models.error ||
    vehicleTypes.error ||
    vehicleClasses.error ||
    brandOrigins.error ||
    seats.error ||
    engineTypes.error ||
    engineSizes.error;

  return {
    countries,
    brands,
    agents,
    models,
    vehicleTypes,
    vehicleClasses,
    brandOrigins,
    seats,
    engineTypes,
    engineSizes,
    isLoading,
    hasError,
  };
};
