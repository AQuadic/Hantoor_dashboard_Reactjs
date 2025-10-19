import { Switch, Input } from "@heroui/react";
import React from "react";
import { useTranslation } from "react-i18next";
import { useVehicleForm } from "@/hooks/useVehicleForm";
import MobileInput from "@/components/general/MobileInput";
import { countries } from "countries-list";

// helper to build the same country shape used across the app's MobileInput
const getCountryByIso2 = (iso2: string) => {
  if (!iso2) return { iso2: "EG", name: "Egypt", phone: ["20"] };
  const iso = iso2.toUpperCase();
  const country = countries[iso as keyof typeof countries];
  if (!country) return { iso2: iso, name: iso, phone: [""] };
  return {
    iso2: iso,
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
  const [phone, setPhone] = React.useState("");
  const initAppliedRef = React.useRef(false);

  // Initialize phone and country from formData when editing.
  // Don't flip an "initialized" flag before vehicle data arrives - instead
  // react to the actual fields so late-arriving data (from API) is applied.
  React.useEffect(() => {
    // Apply initial values from formData once when vehicle data loads.
    // This prevents a race where selecting a different country gets
    // immediately overwritten by stale formData.
    if (initAppliedRef.current) return;
    if (!formData) return;

    const hasAnyValue =
      formData.rent_to_own_whatsapp || formData.rent_to_own_phone_country;
    if (!hasAnyValue) return;

    // Set phone only if local phone is empty (don't overwrite user input)
    if (!phone && formData.rent_to_own_whatsapp) {
      setPhone(formData.rent_to_own_whatsapp);
    }

    // Set selected country only if not set by user yet
    const rawCountry = formData.rent_to_own_phone_country;
    const normalizedCountry = rawCountry
      ? String(rawCountry).trim().toUpperCase()
      : "";
    if (normalizedCountry && selectedCountry?.iso2 !== normalizedCountry) {
      const country = getCountryByIso2(normalizedCountry);
      setSelectedCountry(country);
    }

    initAppliedRef.current = true;
  }, [formData, phone, selectedCountry]);

  // Update WhatsApp number and phone country in form when they change
  React.useEffect(() => {
    if (!selectedCountry) return;

    const countryCode = selectedCountry.phone?.[0] || "";
    let formattedPhone = phone.trim();

    if (formattedPhone && !formattedPhone.startsWith("+")) {
      formattedPhone = `+${countryCode}${formattedPhone.replace(/^0+/, "")}`;
    }

    if (formattedPhone !== formData?.rent_to_own_whatsapp) {
      updateField?.("rent_to_own_whatsapp", formattedPhone as unknown as string);
    }
  }, [phone, selectedCountry, formData?.rent_to_own_whatsapp, updateField]);

  React.useEffect(() => {
    const rawFormCountry = formData?.rent_to_own_phone_country;
    const normalizedFormCountry = rawFormCountry
      ? String(rawFormCountry).trim().toUpperCase()
      : "";
    if (selectedCountry.iso2 !== normalizedFormCountry) {
      updateField?.(
        "rent_to_own_phone_country",
        selectedCountry.iso2 as unknown as string
      );
    }
  }, [selectedCountry, formData, updateField]);

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
