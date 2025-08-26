import React from "react";
import { Input, Checkbox } from "@heroui/react";
import TableDeleteButton from "@/components/general/dashboard/table/TableDeleteButton";
import { useTranslation } from "react-i18next";
import { VehiclePackage } from "@/api/vehicles/fetchVehicles";
import { useVehicleForm } from "@/contexts/VehicleFormContext";

interface CarPackageFieldProps {
  index: number;
  pkg: VehiclePackage;
  handleDelete: () => void;
}

const CarPackageField = ({
  index,
  pkg,
  handleDelete,
}: CarPackageFieldProps) => {
  const { t } = useTranslation("cars");
  const { updatePackage } = useVehicleForm();

  return (
    <div className="mt-4 flex items-center  gap-4 ">
      <div className="min-w-1/4">
        <Input
          label={t("arDistance")}
          variant="bordered"
          placeholder="1 سنة او 20.000 كم"
          classNames={{ label: "mb-2 text-base" }}
          size="lg"
          value={pkg.name?.ar || ""}
          onChange={(e) =>
            updatePackage(index, {
              name: { ...pkg.name, ar: e.target.value },
            })
          }
        />
      </div>
      <div className="min-w-1/4">
        <Input
          label={t("enDistance")}
          variant="bordered"
          placeholder="اكتب هنا"
          classNames={{ label: "mb-2 text-base" }}
          size="lg"
          value={pkg.name?.en || ""}
          onChange={(e) =>
            updatePackage(index, {
              name: { ...pkg.name, en: e.target.value },
            })
          }
        />
      </div>
      <div className="w-full">
        <Input
          label={t("price")}
          variant="bordered"
          placeholder="1000 درهم"
          classNames={{ label: "mb-2 text-base" }}
          size="lg"
          value={pkg.price || ""}
          onChange={(e) => updatePackage(index, { price: e.target.value })}
        />
      </div>
      <Checkbox
        isSelected={pkg.is_active}
        onValueChange={(checked) =>
          updatePackage(index, { is_active: checked })
        }
      >
        {t("appear")}
      </Checkbox>
      {index > 0 && (
        <span>
          <TableDeleteButton handleDelete={handleDelete} />
        </span>
      )}
    </div>
  );
};

export default CarPackageField;
