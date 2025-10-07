import { Checkbox, Input, Switch } from "@heroui/react";
import React from "react";
import AddFieldButton from "@/components/cars/addcars/AddFieldButton";
import TableDeleteButton from "@/components/general/dashboard/table/TableDeleteButton";
import ImageInput from "@/components/general/ImageInput";
import { useTranslation } from "react-i18next";
import { useVehicleForm } from "@/contexts/VehicleFormContext";

const CarAccessories = () => {
  const { t } = useTranslation("cars");
  const {
    formData,
    updateField,
    accessories,
    addAccessory,
    updateAccessory,
    removeAccessory,
  } = useVehicleForm();

  // Auto-enable toggle when accessories exist
  React.useEffect(() => {
    if (accessories.length > 0 && !formData.is_accessories_active) {
      updateField("is_accessories_active", true);
    }
  }, [accessories.length, formData.is_accessories_active, updateField]);

  const handleToggle = (value: boolean) => {
    updateField("is_accessories_active", value);
    if (!value) {
      // Clear all accessories when disabled
      while (accessories.length > 0) {
        removeAccessory(0);
      }
    } else if (accessories.length === 0) {
      // Add initial accessory when enabled
      addAccessory();
    }
  };

  const addCarDetailsField = () => {
    addAccessory();
  };

  const removeCarDetailsField = (index: number) => {
    removeAccessory(index);
  };

  return (
    <div className="bg-white mt-3 rounded-[15px] py-[19px] px-[29px] ">
      <div className="flex items-center  justify-between ">
        <h1 className="text-lg text-[#2A32F8] font-bold mb-2">
          {t("accessories")}
        </h1>
        <Switch
          isSelected={formData.is_accessories_active || false}
          onValueChange={handleToggle}
          size="sm"
          color="primary"
        />
      </div>
      {formData.is_accessories_active &&
        accessories.map((accessory, index) => (
          <div key={index} className="mt-4 flex items-center gap-4 pt-4">
            <span className="min-w-[65px]">
              <ImageInput
                image={accessory.image as File | null}
                setImage={(value) => {
                  const newImage =
                    typeof value === "function"
                      ? value(accessory.image as File | null)
                      : value;
                  updateAccessory(index, { image: newImage });
                }}
                width={65}
                height={65}
              />
            </span>
            <div className="w-1/2">
              <Input
                label={t("arName")}
                variant="bordered"
                placeholder={t("writeHere")}
                classNames={{ label: "mb-2 text-base" }}
                size="lg"
                value={accessory.name?.ar || ""}
                onChange={(e) =>
                  updateAccessory(index, {
                    name: { ...accessory.name, ar: e.target.value },
                  })
                }
              />
            </div>
            <div className="w-1/2">
              <Input
                label={t("enName")}
                variant="bordered"
                placeholder={t("writeHere")}
                classNames={{ label: "mb-2 text-base" }}
                size="lg"
                value={accessory.name?.en || ""}
                onChange={(e) =>
                  updateAccessory(index, {
                    name: { ...accessory.name, en: e.target.value },
                  })
                }
              />
            </div>
            <div className="w-full">
              <Input
                label={t("price")}
                variant="bordered"
                placeholder={t("writeHere")}
                classNames={{ label: "mb-2 text-base" }}
                size="lg"
                value={accessory.price || ""}
                onChange={(e) =>
                  updateAccessory(index, { price: e.target.value })
                }
              />
            </div>
            <Checkbox
              isSelected={accessory.is_active}
              onValueChange={(checked) =>
                updateAccessory(index, { is_active: checked })
              }
            >
              {t("appear")}
            </Checkbox>
            {index !== 0 && (
              <span>
                <TableDeleteButton
                  handleDelete={() => removeCarDetailsField(index)}
                />
              </span>
            )}
          </div>
        ))}

      {formData.is_accessories_active && (
        <AddFieldButton title={t("addMoreData")} onClick={addCarDetailsField} />
      )}
    </div>
  );
};

export default CarAccessories;
