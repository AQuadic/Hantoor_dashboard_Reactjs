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

  const initialCountryIso = formData?.rent_to_own_phone_country
    ? String(formData.rent_to_own_phone_country).trim().toUpperCase()
    : "EG";

  // Phone number state for WhatsApp input (reuse UI pattern from profile)
  const [selectedCountry, setSelectedCountry] = React.useState(() =>
    getCountryByIso2(initialCountryIso)
  );
  const [phone, setPhone] = React.useState("");
  const phoneInitAppliedRef = React.useRef(false);

  // Keep selectedCountry in sync with form data when editing existing vehicles
  React.useEffect(() => {
    const rawCountry = formData?.rent_to_own_phone_country;
    const normalizedCountry = rawCountry
      ? String(rawCountry).trim().toUpperCase()
      : "";
    const isoToUse = normalizedCountry || "EG";

    if (selectedCountry.iso2 === isoToUse) return;

    setSelectedCountry(getCountryByIso2(isoToUse));
  }, [formData?.rent_to_own_phone_country, selectedCountry]);

  // Reset phone initialization whenever the loaded vehicle changes
  React.useEffect(() => {
    phoneInitAppliedRef.current = false;
    setPhone("");
    setSelectedCountry(getCountryByIso2("EG"));
  }, [formData?.id]);

  // Populate phone input once when data arrives, but avoid overwriting user edits
  React.useEffect(() => {
    if (phoneInitAppliedRef.current) return;

    const rentToOwnWhatsapp = formData?.rent_to_own_whatsapp;
    if (!rentToOwnWhatsapp) return;

    setPhone(String(rentToOwnWhatsapp));
    phoneInitAppliedRef.current = true;
  }, [formData?.rent_to_own_whatsapp]);

  // Clear phone field when rent to own is disabled
  React.useEffect(() => {
    if (formData?.is_rent_to_own) return;
    if (!phone) return;

    setPhone("");
    phoneInitAppliedRef.current = false;
  }, [formData?.is_rent_to_own, phone]);

  // Update WhatsApp number and phone country in form when they change
  React.useEffect(() => {
    if (!selectedCountry) return;

    const countryCode = selectedCountry.phone?.[0] || "";
    let formattedPhone = phone.trim();

    if (formattedPhone && !formattedPhone.startsWith("+")) {
      formattedPhone = `+${countryCode}${formattedPhone.replace(/^0+/, "")}`;
    }

    if (formattedPhone !== formData?.rent_to_own_whatsapp) {
      updateField?.(
        "rent_to_own_whatsapp",
        formattedPhone as unknown as string
      );
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
