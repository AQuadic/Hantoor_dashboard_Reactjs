import { Select, SelectItem } from "@heroui/react";
import DashboardInput from "@/components/general/DashboardInput";
import React from "react";
import CarDetailsField from "@/components/cars/addcars/CarDetailsField";
import AddFieldButton from "@/components/cars/addcars/AddFieldButton";
import { useTranslation } from "react-i18next";
import { useVehicleForm } from "@/contexts/VehicleFormContext";
import { VehicleFeature } from "@/api/vehicles/fetchVehicles";
import {
  useAllDropdownData,
  useVehicleTypes,
  useVehicleBodies,
} from "@/hooks/useDropdownData";
import { getAllCountries, Country } from "@/api/countries/getCountry";
import { useQuery } from "@tanstack/react-query";

const CarDetails = () => {
  const { t, i18n } = useTranslation("cars");
  const {
    formData,
    updateField,
    features,
    addFeature,
    removeFeature,
    updateFeature,
  } = useVehicleForm();

  // Fetch all dropdown data
  const {
    brands,
    agents,
    models,
    vehicleClasses,
    brandOrigins,
    seats,
    engineTypes,
    engineSizes,
  } = useAllDropdownData();

  // Fetch vehicle types based on selected brand from formData
  const selectedBrandId = formData?.brand_id;
  const vehicleTypes = useVehicleTypes(selectedBrandId);

  // Fetch vehicle bodies using the hook from useDropdownData
  const vehicleBodies = useVehicleBodies();

  // Fetch all countries - non-paginated
  const { data: allCountries = [], isLoading: countriesLoading } = useQuery<
    Country[],
    Error
  >({
    queryKey: ["allCountries"],
    queryFn: async () => {
      return await getAllCountries();
    },
  });

  const addCarDetailsField = () => {
    addFeature?.();
  };

  const removeCarDetailsField = (index: number) => {
    removeFeature?.(index);
  };

  const handleFeatureUpdate = (
    index: number,
    field: Partial<{
      image: File | null;
      titleEn: string;
      titleAr: string;
      descriptionEn: string;
      descriptionAr: string;
    }>
  ) => {
    const currentFeature = features[index];
    if (!currentFeature) return;

    const updatedFeature = {
      ...currentFeature,
      name: {
        ar: field.titleAr ?? currentFeature.name?.ar ?? "",
        en: field.titleEn ?? currentFeature.name?.en ?? "",
      },
      description: {
        ar: field.descriptionAr ?? currentFeature.description?.ar ?? "",
        en: field.descriptionEn ?? currentFeature.description?.en ?? "",
      },
      image: field.image ?? currentFeature.image,
    };

    updateFeature?.(index, updatedFeature);
  };

  return (
    <div className="bg-white mt-3 rounded-[15px] py-[19px] px-[29px] ">
      <h1 className="text-lg text-[#2A32F8] font-bold mb-2">
        {t("carDetails")}
      </h1>
      <div className="flex flex-col md:flex-row gap-[15px] ">
        <div className="w-full">
          <DashboardInput
            label={`${t("arCarName")} *`}
            value={formData?.nameAr || ""}
            onChange={(value) => updateField?.("nameAr", value)}
            placeholder={t("writeHere")}
          />
        </div>
        <div className="w-full">
          <DashboardInput
            label={`${t("enCarName")} *`}
            value={formData?.nameEn || ""}
            onChange={(value) => updateField?.("nameEn", value)}
            placeholder={t("writeHere")}
          />
        </div>
      </div>
      <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-[15px]">
        <Select
          label={`${t("country")} *`}
          variant="bordered"
          placeholder={t("choose")}
          classNames={{ label: "mb-2 text-base" }}
          size="lg"
          selectedKeys={
            formData?.country_id ? [formData.country_id.toString()] : []
          }
          onSelectionChange={(keys) => {
            const value = Array.from(keys)[0] as string;
            updateField?.("country_id", value);
          }}
          isLoading={countriesLoading}
        >
          {allCountries.map((country) => (
            <SelectItem key={country.id.toString()}>
              {country.name[i18n.language as "ar" | "en"]}
            </SelectItem>
          ))}
        </Select>
        <Select
          label={`${t("brand")} *`}
          variant="bordered"
          placeholder={t("choose")}
          classNames={{ label: "mb-2 text-base" }}
          size="lg"
          selectedKeys={formData?.brand_id ? [formData.brand_id] : []}
          onSelectionChange={(keys) => {
            const value = Array.from(keys)[0] as string;
            updateField?.("brand_id", value);
          }}
          isLoading={brands.isLoading}
        >
          {(brands.data || []).map((brand) => (
            <SelectItem key={brand.id.toString()}>
              {brand.name[i18n.language as "ar" | "en"]}
            </SelectItem>
          ))}
        </Select>

        <Select
          label={`${t("agent")} *`}
          variant="bordered"
          placeholder={t("choose")}
          classNames={{ label: "mb-2 text-base" }}
          size="lg"
          selectedKeys={formData?.agent_id ? [formData.agent_id] : []}
          onSelectionChange={(keys) => {
            const value = Array.from(keys)[0] as string;
            updateField?.("agent_id", value);
          }}
          isLoading={agents.isLoading}
        >
          {(agents.data || []).map((agent) => (
            <SelectItem key={agent.id.toString()}>
              {agent.name[i18n.language as "ar" | "en"]}
            </SelectItem>
          ))}
        </Select>

        <Select
          label={`${t("model")} *`}
          variant="bordered"
          placeholder={t("choose")}
          classNames={{ label: "mb-2 text-base" }}
          size="lg"
          selectedKeys={
            formData?.vehicle_model_id ? [formData.vehicle_model_id] : []
          }
          onSelectionChange={(keys) => {
            const value = Array.from(keys)[0] as string;
            updateField?.("vehicle_model_id", value);
          }}
          isLoading={models.isLoading}
        >
          {(models.data || []).map((model) => (
            <SelectItem key={model.id.toString()}>
              {model?.name[i18n.language as "ar" | "en"]}
            </SelectItem>
          ))}
        </Select>

        <Select
          label={`${t("structureType")} *`}
          variant="bordered"
          placeholder={t("choose")}
          classNames={{ label: "mb-2 text-base" }}
          size="lg"
          selectedKeys={
            formData?.vehicle_body_type_id
              ? [formData.vehicle_body_type_id.toString()]
              : []
          }
          onSelectionChange={(keys) => {
            const value = Array.from(keys)[0] as string;
            updateField?.("vehicle_body_type_id", value);
          }}
          isLoading={vehicleBodies.isLoading}
        >
          {(vehicleBodies.data || []).map((body) => (
            <SelectItem key={body.id.toString()}>
              {body.name[i18n.language as "ar" | "en"]}
            </SelectItem>
          ))}
        </Select>

        <Select
          label={`${t("type")} *`}
          variant="bordered"
          placeholder={
            selectedBrandId
              ? t("choose")
              : t("selectBrandFirst") || "Select brand first"
          }
          classNames={{ label: "mb-2 text-base" }}
          size="lg"
          selectedKeys={
            formData?.vehicle_type_id ? [formData.vehicle_type_id] : []
          }
          onSelectionChange={(keys) => {
            const value = Array.from(keys)[0] as string;
            updateField?.("vehicle_type_id", value);
          }}
          isLoading={vehicleTypes.isLoading}
          disabled={!selectedBrandId}
        >
          {(vehicleTypes.data || []).map((type) => (
            <SelectItem key={type.id.toString()}>
              {type.name[i18n.language as "ar" | "en"]}
            </SelectItem>
          ))}
        </Select>

        <Select
          label={`${t("category")} *`}
          variant="bordered"
          placeholder={t("choose")}
          classNames={{ label: "mb-2 text-base" }}
          size="lg"
          selectedKeys={
            formData?.vehicle_class_id ? [formData.vehicle_class_id] : []
          }
          onSelectionChange={(keys) => {
            const value = Array.from(keys)[0] as string;
            updateField?.("vehicle_class_id", value);
          }}
          isLoading={vehicleClasses.isLoading}
        >
          {(vehicleClasses.data || []).map((vehicleClass) => (
            <SelectItem key={vehicleClass.id.toString()}>
              {vehicleClass.name[i18n.language as "ar" | "en"]}
            </SelectItem>
          ))}
        </Select>

        <Select
          label={`${t("brandOrigin")} *`}
          variant="bordered"
          placeholder={t("choose")}
          classNames={{ label: "mb-2 text-base" }}
          size="lg"
          selectedKeys={
            formData?.brand_origin_id ? [formData.brand_origin_id] : []
          }
          onSelectionChange={(keys) => {
            const value = Array.from(keys)[0] as string;
            updateField?.("brand_origin_id", value);
          }}
          isLoading={brandOrigins.isLoading}
        >
          {(brandOrigins.data || []).map((origin) => (
            <SelectItem key={origin.id.toString()}>
              {origin.name[i18n.language as "ar" | "en"]}
            </SelectItem>
          ))}
        </Select>

        <Select
          label={`${t("seats")} *`}
          variant="bordered"
          placeholder={t("choose")}
          classNames={{ label: "mb-2 text-base" }}
          size="lg"
          selectedKeys={
            formData?.number_of_seat_id ? [formData.number_of_seat_id] : []
          }
          onSelectionChange={(keys) => {
            const value = Array.from(keys)[0] as string;
            updateField?.("number_of_seat_id", value);
          }}
          isLoading={seats.isLoading}
        >
          {(seats.data || []).map((seat) => (
            <SelectItem key={seat.id.toString()}>{seat.name.ar}</SelectItem>
          ))}
        </Select>

        <Select
          label={`${t("engineType")} *`}
          variant="bordered"
          placeholder={t("choose")}
          classNames={{ label: "mb-2 text-base" }}
          size="lg"
          selectedKeys={
            formData?.engine_type_id ? [formData.engine_type_id] : []
          }
          onSelectionChange={(keys) => {
            const value = Array.from(keys)[0] as string;
            updateField?.("engine_type_id", value);
          }}
          isLoading={engineTypes.isLoading}
        >
          {(engineTypes.data || []).map((engineType) => (
            <SelectItem key={engineType.id.toString()}>
              {engineType.name[i18n.language as "ar" | "en"]}
            </SelectItem>
          ))}
        </Select>

        <Select
          label={`${t("engineSize")} *`}
          variant="bordered"
          placeholder={t("choose")}
          classNames={{ label: "mb-2 text-base" }}
          size="lg"
          selectedKeys={
            formData?.engine_volume_id ? [formData.engine_volume_id] : []
          }
          onSelectionChange={(keys) => {
            const value = Array.from(keys)[0] as string;
            updateField?.("engine_volume_id", value);
          }}
          isLoading={engineSizes.isLoading}
        >
          {(engineSizes.data || []).map((engineSize) => (
            <SelectItem key={engineSize.id.toString()}>
              {engineSize.name[i18n.language as "ar" | "en"]}
            </SelectItem>
          ))}
        </Select>
      </div>

      <div>
        {features?.map((feature: VehicleFeature, index: number) => (
          <CarDetailsField
            handleDelete={() => removeCarDetailsField(index)}
            field={{
              image: feature.image as File | null,
              titleEn: feature.name?.en || "",
              titleAr: feature.name?.ar || "",
              descriptionEn: feature.description?.en || "",
              descriptionAr: feature.description?.ar || "",
            }}
            onUpdate={(field) => handleFeatureUpdate(index, field)}
            key={feature.id || `feature-${index}`}
          />
        ))}
      </div>
      <AddFieldButton title={t("addMoreData")} onClick={addCarDetailsField} />
    </div>
  );
};

export default CarDetails;
