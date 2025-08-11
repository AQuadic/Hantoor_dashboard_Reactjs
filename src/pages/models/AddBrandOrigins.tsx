import DashboardButton from "@/components/general/dashboard/DashboardButton";
import DashboardHeader from "@/components/general/dashboard/DashboardHeader";
import DashboardInput from "@/components/general/DashboardInput";
import React, { useState } from "react";
import { postBrandOrigin } from "@/api/models/brandOrigin/postBrandOrigin";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const AddBrandOrigins = () => {
  const { t } = useTranslation("models");
  const [arBrandName, setArBrandName] = useState("");
  const [enBrandName, setEnBrandName] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  return (
    <div>
      <DashboardHeader
        titleAr="اضافة منشأ ماركة جديد"
        titleEn="Add a new brand origin"
        items={[
          {
            titleAr: "الصفحة الرئيسية",
            titleEn: "Home",
            link: "/",
          },
          {
            titleAr: "اقسام السيارات ",
            titleEn: " Car Sections",
            link: "/",
          },
          {
            titleAr: "اضافة منشأ ماركة جديد",
            titleEn: "Add a new brand origin",
            link: "/",
          },
        ]}
      />
      <div className="flex flex-col gap-8 p-8">
        <div className="flex flex-col gap-4 p-8 bg-white rounded-2xl">
          <div className="flex gap-4">
            <div className="flex-1">
              <DashboardInput
                label={t("arBrandName")}
                value={arBrandName}
                onChange={setArBrandName}
                placeholder="أوروبا"
              />
            </div>
            <div className="flex-1">
              <DashboardInput
                label={t("enBrandName")}
                value={enBrandName}
                onChange={setEnBrandName}
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
                await postBrandOrigin({
                  name: {
                    ar: arBrandName,
                    en: enBrandName,
                  },
                });
                navigate("/models");
              } catch {
                // Optionally handle error, e.g. show toast
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

export default AddBrandOrigins;
