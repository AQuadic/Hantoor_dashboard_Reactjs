import { Checkbox, Select, SelectItem, Selection } from "@heroui/react";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { type VehicleFilters } from "@/api/vehicles";
import { type Brand, fetchBrands } from "@/api/brand/fetchBrands";
import {
  type VehicleType,
  getVehicleTypes,
} from "@/api/models/carTypes/getCarTypes";
import { type Model, getModels } from "@/api/models/models/getModels";

interface CarsSelectProps {
  filters?: VehicleFilters;
  onFilterChange?: (newFilters: Partial<VehicleFilters>) => void;
}

const CarsSelect = ({ filters, onFilterChange }: CarsSelectProps) => {
  const { t, i18n } = useTranslation("cars");

  // Use a numeric sentinel for the "all" option to avoid `any` casts.
  // Most IDs in the API are numeric, so -1 is an unlikely real id.
  const ALL_ID = -1;

  // Fetch brands data
  const { data: brandsData } = useQuery({
    queryKey: ["brands"],
    queryFn: () => fetchBrands(1, "", undefined, undefined, false),
  });

  // Fetch vehicle types data
  const { data: vehicleTypesData } = useQuery({
    queryKey: ["vehicleTypes"],
    queryFn: () => getVehicleTypes({ pagination: false }),
  });

  // Fetch models data
  const { data: modelsData } = useQuery({
    queryKey: ["models"],
    queryFn: () => getModels(1, 100), // Get more models for filtering
  });

  const brands = Array.isArray(brandsData?.data) ? brandsData.data : [];
  const vehicleTypes = Array.isArray(vehicleTypesData) ? vehicleTypesData : [];
  const models = Array.isArray(modelsData?.data) ? modelsData.data : [];

  const allBrandOption: Brand = {
    id: ALL_ID,
    name: { ar: "الجميع", en: "All" },
    created_at: "",
    updated_at: "",
    is_active: true,
  };

  const allVehicleTypeOption: VehicleType = {
    id: ALL_ID,
    name: { ar: "الجميع", en: "All" },
    created_at: "",
    updated_at: "",
    is_active: true,
    body_type_id: ALL_ID,
    brand_id: ALL_ID,
  };

  const allModelOption: Model = {
    id: ALL_ID,
    name: { ar: "الجميع", en: "All" },
    is_active: true,
  };

  const brandsWithAll = [allBrandOption, ...brands];
  const vehicleTypesWithAll = [allVehicleTypeOption, ...vehicleTypes];
  const modelsWithAll = [allModelOption, ...models];

  const handleBrandChange = (selection: Selection) => {
    const selectionArray = Array.from(selection);
    if (selectionArray.includes(String(ALL_ID))) {
      onFilterChange?.({ brand_id: [] });
    } else {
      const selectedBrands = selectionArray.map((key) => Number(key));
      onFilterChange?.({ brand_id: selectedBrands });
    }
  };

  const handleTypeChange = (selection: Selection) => {
    const selectionArray = Array.from(selection);
    // If "all" is selected, clear the filter
    if (selectionArray.includes(String(ALL_ID))) {
      onFilterChange?.({ vehicle_type_id: [] });
    } else {
      const selectedTypes = selectionArray.map((key) => Number(key));
      onFilterChange?.({ vehicle_type_id: selectedTypes });
    }
  };

  const handleModelChange = (selection: Selection) => {
    const selectionArray = Array.from(selection);
    if (selectionArray.includes(String(ALL_ID))) {
      onFilterChange?.({ vehicle_model_id: [] });
    } else {
      const selectedModels = selectionArray.map((key) => Number(key));
      onFilterChange?.({ vehicle_model_id: selectedModels });
    }
  };

  const handleDiscountChange = (checked: boolean) => {
    onFilterChange?.({ is_discount: checked });
  };

  const handleOfferChange = (checked: boolean) => {
    onFilterChange?.({ is_offer: checked });
  };

  return (
    <div className="mt-[11px] flex flex-wrap items-center gap-[5px] px-8">
      <div className="w-[160px]">
        <Select
          items={brandsWithAll}
          label={t("brand")}
          placeholder={t("all")}
          selectionMode="single"
          selectedKeys={
            filters?.brand_id && filters.brand_id.length > 0
              ? new Set(filters.brand_id.map(String))
              : new Set([String(ALL_ID)])
          }
          onSelectionChange={handleBrandChange}
          classNames={{
            trigger: "h-[46px] !h-[46px] min-h-[46px] bg-white border py-0",
            label: "text-sm text-gray-700",
            listbox: "bg-white shadow-md",
          }}
        >
          {(brand: Brand) => (
            <SelectItem key={String(brand.id)}>
              {brand.name[i18n.language as "ar" | "en"] || brand.name.en}
            </SelectItem>
          )}
        </Select>
      </div>

      <div className="w-[160px]">
        <Select
          items={vehicleTypesWithAll}
          label={t("type")}
          placeholder={t("all")}
          selectionMode="single"
          selectedKeys={
            filters?.vehicle_type_id && filters.vehicle_type_id.length > 0
              ? new Set(filters.vehicle_type_id.map(String))
              : new Set([String(ALL_ID)])
          }
          onSelectionChange={handleTypeChange}
          classNames={{
            trigger: "h-[46px] !h-[46px] min-h-[46px] bg-white border py-0",
            label: "text-sm text-gray-700",
            listbox: "bg-white shadow-md",
          }}
        >
          {(vehicleType: VehicleType) => (
            <SelectItem key={String(vehicleType.id)}>
              {vehicleType.name[i18n.language as "ar" | "en"] ||
                vehicleType.name.en}
            </SelectItem>
          )}
        </Select>
      </div>

      <div className="w-[160px]">
        <Select
          items={modelsWithAll}
          label={t("model")}
          placeholder={t("all")}
          selectionMode="single"
          selectedKeys={
            filters?.vehicle_model_id && filters.vehicle_model_id.length > 0
              ? new Set(filters.vehicle_model_id.map(String))
              : new Set([String(ALL_ID)])
          }
          onSelectionChange={handleModelChange}
          classNames={{
            trigger: "h-[46px] !h-[46px] min-h-[46px] bg-white border py-0",
            label: "text-sm text-gray-700",
            listbox: "bg-white shadow-md",
          }}
        >
          {(model: Model) => (
            <SelectItem key={String(model.id)}>
              {model.name[i18n.language as "ar" | "en"] || model.name.en}
            </SelectItem>
          )}
        </Select>
      </div>

      <div className="md:w-[340px] w-full h-[46px] border border-[#DBDEE1] rounded-[34px] flex items-center justify-around">
        <div className="flex items-center">
          <Checkbox
            isSelected={filters?.is_discount || false}
            onValueChange={handleDiscountChange}
            size="md"
          />
          <p className="text-[#1E1B1B] md:text-base text-sm font-normal">
            {t("containDiscount")}
          </p>
        </div>
        <div className="flex items-center">
          <Checkbox
            isSelected={filters?.is_offer || false}
            onValueChange={handleOfferChange}
            size="md"
          />
          <p className="text-[#1E1B1B] md:text-base text-sm font-normal">
            {t("containOffers")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CarsSelect;
