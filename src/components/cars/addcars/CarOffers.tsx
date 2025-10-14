import { Checkbox, Input, Switch } from "@heroui/react";
import React from "react";
import AddFieldButton from "@/components/cars/addcars/AddFieldButton";
import TableDeleteButton from "@/components/general/dashboard/table/TableDeleteButton";
import ImageInput from "@/components/general/ImageInput";
import { useTranslation } from "react-i18next";
import { useVehicleForm } from "@/contexts/VehicleFormContext";

const CarOffers = () => {
  const { t } = useTranslation("cars");
  const { formData, updateField, offers, addOffer, updateOffer, removeOffer } =
    useVehicleForm();

  const handleToggle = (value: boolean) => {
    // Just toggle the state - don't manipulate the data
    updateField("is_offers_active", value);

    // Only add initial item if enabling and there are no items
    if (value && offers.length === 0) {
      addOffer();
    }
  };

  const addCarDetailsField = () => {
    // Auto-enable when adding if not already enabled
    if (!formData.is_offers_active) {
      updateField("is_offers_active", true);
    }
    addOffer();
  };

  const removeCarDetailsField = (index: number) => {
    removeOffer(index);
  };

  return (
    <div className="bg-white mt-3 rounded-[15px] py-[19px] px-[29px] ">
      <div className="flex items-center  justify-between ">
        <h1 className="text-lg text-[#2A32F8] font-bold mb-2">{t("offers")}</h1>
        <Switch
          isSelected={formData.is_offers_active || false}
          onValueChange={handleToggle}
          size="sm"
          color="primary"
        />
      </div>

      {formData.is_offers_active &&
        offers.map((offer, index) => (
          <div key={index} className="mt-4 flex items-center gap-4 pt-4">
            <span className="min-w-[65px]">
              <ImageInput
                image={offer.image as File | null}
                setImage={(value) => {
                  const newImage =
                    typeof value === "function"
                      ? value(offer.image as File | null)
                      : value;
                  updateOffer(index, { image: newImage });
                }}
                width={65}
                height={65}
              />
            </span>

            <div className="w-full">
              <Input
                label={t("arName")}
                variant="bordered"
                placeholder={t("writeHere")}
                classNames={{ label: "mb-2 text-base" }}
                size="lg"
                value={offer.name?.ar || ""}
                onChange={(e) =>
                  updateOffer(index, {
                    name: {
                      ...(offer.name ?? { ar: "", en: "" }),
                      ar: e.target.value,
                    },
                  })
                }
              />
            </div>

            <div className="w-full">
              <Input
                label={t("enName")}
                variant="bordered"
                placeholder={t("writeHere")}
                classNames={{ label: "mb-2 text-base" }}
                size="lg"
                value={offer.name?.en || ""}
                onChange={(e) =>
                  updateOffer(index, {
                    name: {
                      ...(offer.name ?? { ar: "", en: "" }),
                      en: e.target.value,
                    },
                  })
                }
              />
            </div>

            <div className="w-full">
              <Input
                label={t("arDetails")}
                variant="bordered"
                placeholder={t("writeHere")}
                classNames={{ label: "mb-2 text-base" }}
                size="lg"
                value={offer.description?.ar || ""}
                onChange={(e) =>
                  updateOffer(index, {
                    description: {
                      ...(offer.description ?? { ar: "", en: "" }),
                      ar: e.target.value,
                    },
                  })
                }
              />
            </div>

            <div className="w-full">
              <Input
                label={t("enDetails")}
                variant="bordered"
                placeholder={t("writeHere")}
                classNames={{ label: "mb-2 text-base" }}
                size="lg"
                value={offer.description?.en || ""}
                onChange={(e) =>
                  updateOffer(index, {
                    description: {
                      ...(offer.description ?? { ar: "", en: "" }),
                      en: e.target.value,
                    },
                  })
                }
              />
            </div>

            <Checkbox
              isSelected={offer.is_active}
              onValueChange={(checked) =>
                updateOffer(index, { is_active: checked })
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

      {formData.is_offers_active && (
        <AddFieldButton title={t("addMoreData")} onClick={addCarDetailsField} />
      )}
    </div>
  );
};

export default CarOffers;
