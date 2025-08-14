import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { Input } from "@heroui/react";
import DashboardButton from "@/components/general/dashboard/DashboardButton";
import DashboardHeader from "@/components/general/dashboard/DashboardHeader";
import { updateEngineType } from "@/api/models/engineTypes/editEngineType";
import { getEngineTypeById, EngineType } from "@/api/models/engineTypes/getEngineTypeById";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Loading from "@/components/general/Loading";

const EditEnginType = () => {
  const { t } = useTranslation("models");
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate();

  const { data: engineType, isLoading, error } = useQuery<EngineType>({
    queryKey: ["engineType", id],
    queryFn: () => getEngineTypeById(Number(id)),
    enabled: !!id,
    retry: false,
  });

  const [arName, setArName] = useState("");
  const [enName, setEnName] = useState("");
  const [, setLoading] = useState(false);
  const [, setError] = useState<string | null>(null);


  useEffect(() => {
    if (engineType) {
      setArName(engineType.name.ar);
      setEnName(engineType.name.en);
    }
  }, [engineType]);

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
      toast.success(t('engineTypeEdited'))
      navigate("/models?section=Engine Types");
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
      <div className="flex flex-col gap-8 md:p-8 p-2">
        <div className="flex flex-col gap-4 lg:p-8 p-2 bg-white rounded-2xl">
          <div className="flex md:flex-row flex-col gap-4">
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
