import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { Input } from "@heroui/react";
import DashboardButton from "@/components/general/dashboard/DashboardButton";
import DashboardHeader from "@/components/general/dashboard/DashboardHeader";
import { updateEngineType } from "@/api/models/engineTypes/editEngineType";

const EditEnginType = () => {
  const { t } = useTranslation("models");
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate();

  const [arName, setArName] = useState("");
  const [enName, setEnName] = useState("");
  const [, setLoading] = useState(false);
  const [, setError] = useState<string | null>(null);

  const handleSave = async () => {
    if (!id) {
      setError("Invalid engine type ID");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      await updateEngineType(Number(id), {
        name: { ar: arName, en: enName },
      });
      navigate("/models"); 
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to update engine type");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <DashboardHeader
        titleAr="تعديل نوع الماكينة"
        titleEn="Edit engine type"
        items={[
          {
            titleAr: "الصفحة الرئيسية",
            titleEn: "Home",
            link: "/",
          },
          {
            titleAr: "اقسام السيارات ",
            titleEn: " Car Sections",
            link: "/models",
          },
          {
            titleAr:"تعديل نوع الماكينة",
            titleEn: "Edit engine type",
            link: "/",
          },
        ]}
      />
      <div className="flex flex-col gap-8 p-8">
        <div className="flex flex-col gap-4 p-8 bg-white rounded-2xl">
          <div className="flex gap-4">
            <div className="flex-1">
              <Input
                label={t('arEngineType')}
                variant="bordered"
                placeholder={t('gasoline')}
                classNames={{ label: "mb-2 text-base" }}
                size="lg"
                value={arName}
                onChange={(e) => setArName(e.target.value)}
              />
            </div>
            <Input
              label={t('enEngineType')}
              variant="bordered"
              placeholder="اكتب هنا"
              className="flex-1"
              classNames={{ label: "mb-2 text-base" }}
              size="lg"
              value={enName}
              onChange={(e) => setEnName(e.target.value)}
            />
          </div>

          <DashboardButton
            titleAr="حفظ"
            titleEn="Save"
            onClick={handleSave}
          />
        </div>
      </div>
    </div>
  );
};

export default EditEnginType;
