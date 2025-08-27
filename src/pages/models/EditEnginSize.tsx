import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { Input } from "@heroui/react";
import DashboardButton from "@/components/general/dashboard/DashboardButton";
import DashboardHeader from "@/components/general/dashboard/DashboardHeader";
import { updateEngineSize } from "@/api/models/engineSize/editEngineSize";
import { getEngineSizeById, EngineSize } from "@/api/models/engineSize/getEngineSizeById";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Loading from "@/components/general/Loading";

const EditEngineSize = () => {
  const { t } = useTranslation("models");
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: engineSize, isLoading, error } = useQuery<EngineSize>({
    queryKey: ["engineSize", id],
    queryFn: () => getEngineSizeById(Number(id)),
    enabled: !!id,
    retry: false,
  });

  const [arSize, setArSize] = useState("");
  const [enSize, setEnSize] = useState("");
  const [, setLoading] = useState(false);
  const [, setError] = useState<string | null>(null);

  useEffect(() => {
    if (engineSize) {
      setArSize(engineSize.name.ar);
      setEnSize(engineSize.name.en);
    }
  }, [engineSize]);

  const handleSave = async () => {
    if (!id) {
      setError("Invalid engine size ID");
      return;
    }
    setLoading(true);
    setError(null);
    setLoading(true);
    try {
      await updateEngineSize(Number(id), {
        name: { ar: arSize, en: enSize },
      });
      toast.success(t('engineSizeEdited'))
      navigate("/models?section=Engine Sizes");
    } catch (err: any) {
      const errorMsg =
        err?.response?.data?.message ||
        err?.message ||
        t("somethingWentWrong");
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) return <Loading />;

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
                placeholder={t("writeHere")}
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
