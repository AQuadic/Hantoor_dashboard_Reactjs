import { useQuery } from "@tanstack/react-query";
import { fetchBrands } from "@/api/brand/fetchBrands";
import { fetchAgents } from "@/api/agents/fetchAgents";
import { getModels } from "@/api/models/models/getModels";
import { getVehicleBodies } from "@/api/models/structureType/getStructure";
import { getVehicleTypes } from "@/api/models/carTypes/getCarTypes";
import { getVehicleClasses } from "@/api/categories/getCategory";
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
  const { data, isLoading, error, refetch } = useQuery<Brand[], Error>({
    queryKey: ["brands"],
    queryFn: async () => {
      const response = await fetchBrands(1, "", undefined, undefined, false);
      return Array.isArray(response) ? response : response.data;
    },
  });

  return {
    data: data || [],
    isLoading,
    error,
    refetch,
  };
};

// Agents hook
export const useAgents = (): UseDropdownData<Agent> => {
  const { data, isLoading, error, refetch } = useQuery<Agent[], Error>({
    queryKey: ["agents"],
    queryFn: async () => {
      const response = await fetchAgents(1, "", undefined, false);
      return Array.isArray(response) ? response : response.data;
    },
  });

  return {
    data: data || [],
    isLoading,
    error,
    refetch,
  };
};

// Models hook
export const useModels = (): UseDropdownData<Model> => {
  const { data, isLoading, error, refetch } = useQuery<Model[], Error>({
    queryKey: ["models"],
    queryFn: async () => {
      const response = await getModels(1, 100, "", undefined, false);
      return Array.isArray(response) ? response : response.data || [];
    },
  });

  return {
    data: data || [],
    isLoading,
    error,
    refetch,
  };
};

// Vehicle Bodies (Structure Type) hook
export const useVehicleBodies = (): UseDropdownData<VehicleBody> => {
  const { data, isLoading, error, refetch } = useQuery<VehicleBody[], Error>({
    queryKey: ["vehicleBodies"],
    queryFn: async () => {
      const response = await getVehicleBodies({ pagination: false });
      return Array.isArray(response) ? response : [];
    },
  });

  return {
    data: data || [],
    isLoading,
    error,
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

  const { data, isLoading, error, refetch } = useQuery<VehicleType[], Error>({
    queryKey: ["vehicleTypes", parsedBrandId ?? "all"],
    queryFn: async () => {
      const response = await getVehicleTypes({
        pagination: false,
        brand_id: parsedBrandId,
      });
      return Array.isArray(response) ? response : [];
    },
    enabled: parsedBrandId !== undefined, // only fetch when brand provided
  });

  return {
    data: data || [],
    isLoading,
    error,
    refetch,
  };
};

// Vehicle Classes (Categories) hook
export const useVehicleClasses = (): UseDropdownData<VehicleClass> => {
  const { data, isLoading, error, refetch } = useQuery<VehicleClass[], Error>({
    queryKey: ["vehicleClasses"],
    queryFn: async () => {
      const response = await getVehicleClasses({ pagination: false });
      return Array.isArray(response) ? response : [];
    },
  });

  return {
    data: data || [],
    isLoading,
    error,
    refetch,
  };
};

// Brand Origins hook
export const useBrandOrigins = (): UseDropdownData<BrandOrigin> => {
  const { data, isLoading, error, refetch } = useQuery<BrandOrigin[], Error>({
    queryKey: ["brandOrigins"],
    queryFn: async () => {
      const response = await getBrandOrigin(false);
      return Array.isArray(response) ? response : [];
    },
  });

  return {
    data: data || [],
    isLoading,
    error,
    refetch,
  };
};

// Seats hook
export const useSeats = (): UseDropdownData<NumberOfSeats> => {
  const { data, isLoading, error, refetch } = useQuery<NumberOfSeats[], Error>({
    queryKey: ["seats"],
    queryFn: async () => {
      const response = await getSeats(false);
      return Array.isArray(response) ? response : [];
    },
  });

  return {
    data: data || [],
    isLoading,
    error,
    refetch,
  };
};

// Engine Types hook
export const useEngineTypes = (): UseDropdownData<EngineType> => {
  const { data, isLoading, error, refetch } = useQuery<EngineType[], Error>({
    queryKey: ["engineTypes"],
    queryFn: async () => {
      const response = await getEngineType(false);
      return Array.isArray(response) ? response : [];
    },
  });

  return {
    data: data || [],
    isLoading,
    error,
    refetch,
  };
};

// Engine Sizes hook
export const useEngineSizes = (): UseDropdownData<EngineSize> => {
  const { data, isLoading, error, refetch } = useQuery<EngineSize[], Error>({
    queryKey: ["engineSizes"],
    queryFn: async () => {
      const response = await getEngineSize(false);
      return Array.isArray(response) ? response : [];
    },
  });

  return {
    data: data || [],
    isLoading,
    error,
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
