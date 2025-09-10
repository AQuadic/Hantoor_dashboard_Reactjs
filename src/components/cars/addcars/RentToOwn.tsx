import { Switch, Input } from "@heroui/react";
import React from "react";
import { useTranslation } from "react-i18next";
import { useVehicleForm } from "@/hooks/useVehicleForm";
import MobileInput from "@/components/general/MobileInput";
import { countries } from "countries-list";

// helper to build the same country shape used across the app's MobileInput
const getCountryByIso2 = (iso2: string) => {
  const country = countries[iso2 as keyof typeof countries];
  if (!country) return { iso2: "EG", name: "Egypt", phone: ["20"] };
  return {
    iso2,
    name: country.name,
    phone: [country.phone],
  };
};

const RentToOwn: React.FC = () => {
  const { t } = useTranslation("cars");
  const { formData, updateField } = useVehicleForm();

  // Phone number state for WhatsApp input (reuse UI pattern from profile)
  const [selectedCountry, setSelectedCountry] = React.useState(
    getCountryByIso2("AE")
  );
  const [phone, setPhone] = React.useState(
    formData?.rent_to_own_whatsapp || ""
  );

  // Update WhatsApp number in form when phone changes
  React.useEffect(() => {
    if (phone !== formData?.rent_to_own_whatsapp) {
      updateField?.("rent_to_own_whatsapp", phone as unknown as string);
    }
  }, [phone, formData?.rent_to_own_whatsapp, updateField]);

  return (
    <div className="bg-white mt-3 rounded-[15px] py-[19px] px-[29px]">
      <div className="flex items-center justify-between">
        <h1 className="text-lg text-[#2A32F8] font-bold mb-2">
          {t("rentToOwn")}
        </h1>
        <Switch
          isSelected={formData?.is_rent_to_own || false}
          onValueChange={(value) =>
            updateField?.("is_rent_to_own", value as unknown as boolean)
          }
          size="sm"
          color="primary"
        />
      </div>

      {formData?.is_rent_to_own && (
        <div className="mt-4">
          <div className="flex gap-4 items-start">
            <Input
              value={formData?.rent_to_own_duration || ""}
              onChange={(e) =>
                updateField?.(
                  "rent_to_own_duration",
                  e.target.value as unknown as string
                )
              }
              label={t("arDuration")}
              variant="bordered"
              placeholder={t("writeHere")}
              classNames={{ label: "mb-2 text-base" }}
              size="lg"
              className="w-1/4"
            />
            <Input
              value={formData?.rent_to_own_duration_en || ""}
              onChange={(e) =>
                updateField?.(
                  "rent_to_own_duration_en",
                  e.target.value as unknown as string
                )
              }
              label={t("enDuration")}
              variant="bordered"
              placeholder={t("writeHere")}
              classNames={{ label: "mb-2 text-base" }}
              size="lg"
              className="w-1/4"
            />
            <div className="w-1/4">
              <MobileInput
                label={t("whatsappNumber") || undefined}
                selectedCountry={selectedCountry}
                setSelectedCountry={setSelectedCountry}
                phone={phone}
                setPhone={setPhone}
              />
            </div>
            <Input
              value={formData?.rent_to_own_price || ""}
              onChange={(e) =>
                updateField?.(
                  "rent_to_own_price",
                  e.target.value as unknown as string
                )
              }
              type="number"
              label={t("rentToOwnPrice")}
              variant="bordered"
              placeholder={t("writeHere")}
              classNames={{ label: "mb-2 text-base" }}
              size="lg"
              className="w-1/4"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default RentToOwn;
