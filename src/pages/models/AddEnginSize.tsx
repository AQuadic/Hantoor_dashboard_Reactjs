import { postEngineSize } from "@/api/models/engineSize/postEngineSize";
import DashboardButton from "@/components/general/dashboard/DashboardButton";
import DashboardHeader from "@/components/general/dashboard/DashboardHeader";
import DashboardInput from "@/components/general/DashboardInput";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

const AddEnginSize = () => {
  const { t } = useTranslation("models");
  const navigate = useNavigate();
  const [arEnginSize, setArEnginSize] = useState("");
  const [enEnginSize, setEnEnginSize] = useState("");
    const [loading, setLoading] = useState(false);
  
  return (
    <div>
      <DashboardHeader
        titleAr="اضافة حجم ماكينة جديدة"
        titleEn="Add new engine size"
        items={[
          {
            titleAr: "الصفحة الرئيسية",
            titleEn: "Home",
            link: "/",
          },
          {
            titleAr: "أقسام السيارات",
            titleEn: "Car Sections",
            link: "/models",
          },
          {
            titleAr: "اضافة حجم ماكينة جديدة",
            titleEn: "Add new engine size",
            link: "/",
          },
        ]}
      />
      <div className="flex flex-col gap-8 p-8">
        <div className="flex flex-col gap-4 p-8 bg-white rounded-2xl">
          <div className="flex gap-4">
            <div className="flex-1">
              <DashboardInput
                label={t("arEngineSize")}
                value={arEnginSize}
                onChange={setArEnginSize}
                placeholder="1200 CC"
              />
            </div>
            <DashboardInput
              label={t("enEngineSize")}
              value={enEnginSize}
              onChange={setEnEnginSize}
              placeholder={t("writeHere")}
            />
          </div>

          <DashboardButton 
            titleAr={loading ? "...جاري الإضافة" : "اضافة"}
              titleEn={loading ? "Adding..." : "Add"}
              isLoading={loading}
              onClick={async () => {
                setLoading(true);
                try {
                  await postEngineSize({
                    name: {
                      ar: arEnginSize,
                      en: enEnginSize,
                    },
                  });
                  navigate("/models");
                } catch {
                  // Optionally handle errors (toast, alert, etc)
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

export default AddEnginSize;
