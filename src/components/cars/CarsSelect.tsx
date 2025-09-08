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

  // Fetch brands data
  const { data: brandsData } = useQuery({
    queryKey: ["brands"],
    queryFn: () => fetchBrands(),
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

  const handleBrandChange = (selection: Selection) => {
    const selectedBrands = Array.from(selection).map((key) => Number(key));
    onFilterChange?.({ brand_id: selectedBrands });
  };

  const handleTypeChange = (selection: Selection) => {
    const selectedTypes = Array.from(selection).map((key) => Number(key));
    onFilterChange?.({ vehicle_type_id: selectedTypes });
  };

  const handleModelChange = (selection: Selection) => {
    const selectedModels = Array.from(selection).map((key) => Number(key));
    onFilterChange?.({ vehicle_model_id: selectedModels });
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
          items={brands}
          label={t("brand")}
          placeholder={t("all")}
          selectionMode="multiple"
          selectedKeys={new Set(filters?.brand_id?.map(String) || [])}
          onSelectionChange={handleBrandChange}
          classNames={{
            trigger: "h-[46px] !h-[46px] min-h-[46px] bg-white border py-0",
            label: "text-sm text-gray-700",
            listbox: "bg-white shadow-md",
          }}
        >
          {(brand: Brand) => (
            <SelectItem key={brand.id}>
              {brand.name[i18n.language as "ar" | "en"] || brand.name.en}
            </SelectItem>
          )}
        </Select>
      </div>

      <div className="w-[160px]">
        <Select
          items={vehicleTypes}
          label={t("type")}
          placeholder={t("all")}
          selectionMode="multiple"
          selectedKeys={new Set(filters?.vehicle_type_id?.map(String) || [])}
          onSelectionChange={handleTypeChange}
          classNames={{
            trigger: "h-[46px] !h-[46px] min-h-[46px] bg-white border py-0",
            label: "text-sm text-gray-700",
            listbox: "bg-white shadow-md",
          }}
        >
          {(vehicleType: VehicleType) => (
            <SelectItem key={vehicleType.id}>
              {vehicleType.name[i18n.language as "ar" | "en"] ||
                vehicleType.name.en}
            </SelectItem>
          )}
        </Select>
      </div>

      <div className="w-[160px]">
        <Select
          items={models}
          label={t("model")}
          placeholder={t("all")}
          selectionMode="multiple"
          selectedKeys={new Set(filters?.vehicle_model_id?.map(String) || [])}
          onSelectionChange={handleModelChange}
          classNames={{
            trigger: "h-[46px] !h-[46px] min-h-[46px] bg-white border py-0",
            label: "text-sm text-gray-700",
            listbox: "bg-white shadow-md",
          }}
        >
          {(model: Model) => (
            <SelectItem key={model.id}>
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
