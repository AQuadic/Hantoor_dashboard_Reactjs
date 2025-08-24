import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import DashboardButton from "@/components/general/dashboard/DashboardButton";
import DashboardHeader from "@/components/general/dashboard/DashboardHeader";
import DashboardInput from "@/components/general/DashboardInput";
import { Select, SelectItem } from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import { getVehicleTypes, VehicleType } from "@/api/models/carTypes/getCarTypes";
import toast from "react-hot-toast";
import { addCarClass, AddCarClassPayload } from "@/api/categories/addcategory";

const AddCategories = () => {
  const { t, i18n } = useTranslation("models");
  const navigate = useNavigate();

  const [arName, setArName] = useState("");
  const [enName, setEnName] = useState("");
  const [selectedCarType, setSelectedCarType] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);

  const { data: carTypes, isLoading } = useQuery<VehicleType[], Error>({
    queryKey: ["vehicleTypes"],
    queryFn: () => getVehicleTypes({ pagination: false }),
  });

  const handleAddCategory = async () => {
    if (!arName || !enName || !selectedCarType) {
      toast.error(t("fillAllFields"));
      return;
    }

    setLoading(true);
    try {
      const payload: AddCarClassPayload = {
        name: { ar: arName, en: enName },
        vehicle_type_id: Number(selectedCarType),
        is_active: true,
      };

      await addCarClass(payload);
      toast.success(t("categoryAddedSuccessfully"));
      navigate("/models?section=Categories");
    } catch (error: any) {
      const errorMsg =
        error?.response?.data?.message || error?.message || t("somethingWentWrong");
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <DashboardHeader
        titleAr="اضافة فئة جديدة"
        titleEn="Add a new category"
        items={[
          { titleAr: "الصفحة الرئيسية", titleEn: "Home", link: "/" },
          { titleAr: "اقسام السيارات", titleEn: "Car Sections", link: "/" },
          { titleAr: "اضافة فئة جديدة", titleEn: "Add a new category", link: "/" },
        ]}
      />

      <div className="flex flex-col gap-8 md:p-8 p-2">
        <div className="flex flex-col gap-4 md:p-8 p-2 bg-white rounded-2xl">
          <div className="flex md:flex-row flex-col gap-4">
            <DashboardInput
              label={t("arcategoryName")}
              value={arName}
              onChange={setArName}
              placeholder="4 Runner"
            />
            <DashboardInput
              label={t("encategoryName")}
              value={enName}
              onChange={setEnName}
              placeholder={t("writeHere")}
            />
          </div>

          <div className="mt-4 md:w-1/2 md:rtl:pl-2 md:ltr:pr-2">
            <Select
              size="lg"
              variant="bordered"
              label={t("type")}
              onSelectionChange={(key) => setSelectedCarType(key as string)}
              value={selectedCarType}
              disabled={!carTypes || isLoading}
            >
              {(carTypes || []).map((type) => (
                <SelectItem
                  key={type.id}
                  value={type.id.toString()}
                  textValue={i18n.language === "ar" ? type.name.ar : type.name.en}
                >
                  {i18n.language === "ar" ? type.name.ar : type.name.en}
                </SelectItem>
              ))}
            </Select>
          </div>

          <DashboardButton
            titleAr={loading ? "...جاري الإضافة" : "اضافة"}
            titleEn={loading ? "Adding..." : "Add"}
            isLoading={loading}
            onClick={handleAddCategory}
          />
        </div>
      </div>
    </div>
  );
};

export default AddCategories;