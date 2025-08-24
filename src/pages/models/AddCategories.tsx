import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import DashboardButton from "@/components/general/dashboard/DashboardButton";
import DashboardHeader from "@/components/general/dashboard/DashboardHeader";
import DashboardInput from "@/components/general/DashboardInput";
import { Select, SelectItem } from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import { addCarClass, AddCarClassPayload } from "@/api/categories/addcategory";
import { getVehicleTypes, VehicleType } from "@/api/models/carTypes/getCarTypes";
import toast from "react-hot-toast";

const AddCategories = () => {
  const { t, i18n } = useTranslation("models");
  const navigate = useNavigate();

  const [arName, setArName] = useState("");
  const [enName, setEnName] = useState("");
  const [selectedCarType, setSelectedCarType] = useState("");
  const [loading, setLoading] = useState(false);

  const { data: carTypes, isLoading } = useQuery<VehicleType[], Error>({
    queryKey: ["vehicleTypes"],
    queryFn: () => getVehicleTypes({ pagination: false }),
  });

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

          <div className="mt-4">
            <Select
              size="lg"
              variant="bordered"
              label={t("type")}
              onSelectionChange={(key) => setSelectedCarType(key as string)}
              disabled={!carTypes || isLoading}
              value={selectedCarType}
            >
              {(carTypes || []).map((type) => (
                <SelectItem
                  key={type.id}
                  textValue={i18n.language === "ar" ? type.name.ar : type.name.en}
                  value={type.id}
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
            onClick={async () => {
              if (!arName || !enName || !selectedCarType) {
                toast.error(t("fillAllFields"));
                return;
              }

              setLoading(true);
              try {
                const payload: AddCarClassPayload = {
                  name: { ar: arName, en: enName },
                  vehicle_type_id: selectedCarType,
                  is_active: true,
                };
                await addCarClass(payload);
                toast.success(t("categoryAddedSuccessfully"));
                navigate("/models?section=Categories");
              } catch (error: any) {
                const errorMsg =
                  error?.response?.data?.message ||
                  error?.message ||
                  t("somethingWentWrong");
                toast.error(errorMsg);
              } finally {
                setLoading(false);
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default AddCategories;