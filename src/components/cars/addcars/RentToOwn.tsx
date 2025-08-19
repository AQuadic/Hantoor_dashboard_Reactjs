import { Input, Checkbox } from "@heroui/react";
import React from "react";
import { useTranslation } from "react-i18next";
import { useVehicleForm } from "@/contexts/VehicleFormContext";

const RentToOwn = () => {
  const { t } = useTranslation("cars");
  const { formData, updateField } = useVehicleForm();

  return (
    <div className="bg-white mt-3 rounded-[15px] py-[19px] px-[29px]">
      <h1 className="text-lg text-[#2A32F8] font-bold mb-2">
        {t("rentToOwn")}
      </h1>

      <div className="mb-4">
        <Checkbox
          isSelected={formData?.is_rent_to_own || false}
          onValueChange={(value) => updateField?.("is_rent_to_own", value)}
          className="text-[#606060]"
        >
          {t("enableRentToOwn")}
        </Checkbox>
      </div>

      {formData?.is_rent_to_own && (
        <div className="space-y-4">
          <div className="flex gap-4">
            <div className="w-full">
              <Input
                label={t("duration")}
                variant="bordered"
                placeholder={t("writeHere")}
                classNames={{ label: "mb-2 text-base" }}
                size="lg"
                value={formData?.rent_to_own_duration || ""}
                onChange={(e) =>
                  updateField?.("rent_to_own_duration", e.target.value)
                }
              />
            </div>

            <div className="w-full">
              <Input
                label={t("whatsappNumber")}
                variant="bordered"
                placeholder="123456789"
                classNames={{ label: "mb-2 text-base" }}
                size="lg"
                value={formData?.rent_to_own_whatsapp || ""}
                onChange={(e) =>
                  updateField?.("rent_to_own_whatsapp", e.target.value)
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
                type="number"
                value={formData?.rent_to_own_price || ""}
                onChange={(e) =>
                  updateField?.("rent_to_own_price", e.target.value)
                }
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RentToOwn;
