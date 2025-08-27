import { postEngineType } from "@/api/models/engineTypes/postEngineTypes";
import DashboardButton from "@/components/general/dashboard/DashboardButton";
import DashboardHeader from "@/components/general/dashboard/DashboardHeader";
import DashboardInput from "@/components/general/DashboardInput";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const AddEngineType = () => {
  const { t } = useTranslation("models");
  const navigate = useNavigate();

  const [arEngineType, setArEngineType] = useState("");
  const [enEngineType, setEnEngineType] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <div>
      <DashboardHeader
        titleAr="اضافة نوع ماكينة جديدة"
        titleEn="Add new engine type"
        items={[
          {
            titleAr: "الصفحة الرئيسية",
            titleEn: "Home",
            link: "/",
          },
          {
            titleAr: "أقسام السيارات",
            titleEn: "Car Sections",
            link: "/",
          },
          {
            titleAr: "اضافة نوع ماكينة جديدة",
            titleEn: "Add new engine type",
            link: "/",
          },
        ]}
      />
      <div className="flex flex-col gap-8 p-8">
        <div className="flex flex-col gap-4 p-8 bg-white rounded-2xl">
          <div className="flex gap-4">
            <div className="flex-1">
              <DashboardInput
                label={t("arEngineType")}
                value={arEngineType}
                onChange={setArEngineType}
                placeholder={t("writeHere")}
              />
            </div>
            <div className="flex-1">
              <DashboardInput
                label={t("enEngineType")}
                value={enEngineType}
                onChange={setEnEngineType}
                placeholder={t("writeHere")}
              />
            </div>
          </div>

          <DashboardButton
            titleAr={loading ? "...جاري الإضافة" : "اضافة"}
            titleEn={loading ? "Adding..." : "Add"}
            isLoading={loading}
            onClick={async () => {
              setLoading(true);
              try {
                await postEngineType({
                  name: {
                    ar: arEngineType,
                    en: enEngineType,
                  },
                });
                toast.success(t("engineTypeAdded"))
                navigate("/models?section=Engine Types");
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

export default AddEngineType;
