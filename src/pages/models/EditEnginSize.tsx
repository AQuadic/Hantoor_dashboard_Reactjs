import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { Input } from "@heroui/react";
import DashboardButton from "@/components/general/dashboard/DashboardButton";
import DashboardHeader from "@/components/general/dashboard/DashboardHeader";
import { updateEngineSize } from "@/api/models/engineSize/editEngineSize";

const EditEngineSize = () => {
  const { t } = useTranslation("models");
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [arSize, setArSize] = useState("");
  const [enSize, setEnSize] = useState("");
  const [, setLoading] = useState(false);
  const [, setError] = useState<string | null>(null);

  const handleSave = async () => {
    if (!id) {
      setError("Invalid engine size ID");
      return;
    }
    setLoading(true);
    setError(null);

    try {
      await updateEngineSize(Number(id), {
        name: { ar: arSize, en: enSize },
      });
      navigate("/models");
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to update engine size");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <DashboardHeader
        titleAr="تعديل حجم الماكينة"
        titleEn="Edit engine size"
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
            titleAr: "تعديل حجم الماكينة",
            titleEn: "Edit engine size",
            link: "/",
          },
        ]}
      />
      <div className="flex flex-col gap-8 md:p-8 p-2">
        <div className="flex flex-col gap-4 lg:p-8 p-2 bg-white rounded-2xl">
          <div className="flex md:flex-row flex-col gap-4">
            <div className="flex-1">
              <Input
                label={t('arEngineSize')}
                variant="bordered"
                placeholder="1200 CC"
                classNames={{ label: "mb-2 text-base" }}
                size="lg"
                value={arSize}
                onChange={(e) => setArSize(e.target.value)}
              />
            </div>
            <Input
              label={t('enEngineSize')}
              variant="bordered"
              placeholder={t('writeHere')}
              className="flex-1"
              classNames={{ label: "mb-2 text-base" }}
              size="lg"
              value={enSize}
              onChange={(e) => setEnSize(e.target.value)}
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

export default EditEngineSize;
