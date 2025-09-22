import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import DashboardButton from "@/components/general/dashboard/DashboardButton";
import DashboardHeader from "@/components/general/dashboard/DashboardHeader";
import DashboardInput from "@/components/general/DashboardInput";
import toast from "react-hot-toast";
import { addCarClass, AddCarClassPayload } from "@/api/categories/addCategory";

const AddCategories = () => {
  const { t } = useTranslation("models");
  const navigate = useNavigate();

  const [arName, setArName] = useState("");
  const [enName, setEnName] = useState("");
  const [selectedCarType,] = useState<number | undefined>();
  const [loading, setLoading] = useState(false);


  const handleAddCategory = async () => {
    if (!arName || !enName) {
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
    } catch (error: unknown) {
      let errorMsg = t("somethingWentWrong");
      if (error && typeof error === "object") {
        const e = error as {
          response?: { data?: { message?: string } };
          message?: string;
        };
        errorMsg = e.response?.data?.message || e.message || errorMsg;
      }
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
          {
            titleAr: "اضافة فئة جديدة",
            titleEn: "Add a new category",
            link: "/",
          },
        ]}
      />

      <div className="flex flex-col gap-8 md:p-8 p-2">
        <div className="flex flex-col gap-4 md:p-8 p-2 bg-white rounded-2xl">
          <div className="flex md:flex-row flex-col gap-4">
            <DashboardInput
              label={t("arcategoryName")}
              value={arName}
              onChange={setArName}
              placeholder={t("writeHere")}
            />
            <DashboardInput
              label={t("encategoryName")}
              value={enName}
              onChange={setEnName}
              placeholder={t("writeHere")}
            />
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
