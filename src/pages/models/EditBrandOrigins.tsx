import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import DashboardButton from "@/components/general/dashboard/DashboardButton";
import DashboardHeader from "@/components/general/dashboard/DashboardHeader";
import DashboardInput from "@/components/general/DashboardInput";
import { updateBrandOrigin } from "@/api/models/brandOrigin/editBrandOrigin";
import { getBrandOriginById, BrandOrigin } from "@/api/models/brandOrigin/getBrandOriginById";
import toast from "react-hot-toast";
import Loading from "@/components/general/Loading";

const EditBrandOrigins = () => {
  const { t } = useTranslation("models");
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: brandOrigin, isLoading } = useQuery<BrandOrigin>({
    queryKey: ["brandOrigin", id],
    queryFn: () => getBrandOriginById(Number(id)),
    enabled: !!id,
    retry: false,
  });

  const [arBrandName, setArBrandName] = useState("");
  const [enBrandName, setEnBrandName] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (brandOrigin) {
      setArBrandName(brandOrigin.name.ar);
      setEnBrandName(brandOrigin.name.en);
      setIsActive(brandOrigin.is_active);
    }
  }, [brandOrigin]);

  const handleSave = async () => {
    if (!id) {
      toast.error(t("invalidBrandOriginId") || "Invalid brand origin ID");
      return;
    }
    setLoading(true);
    try {
      await updateBrandOrigin(Number(id), {
        name: { ar: arBrandName, en: enBrandName },
        is_active: isActive,
      });
      toast.success(t("brandOriginEdited"));
      navigate("/models?section=Brand Origin");
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
        titleAr="تعديل منشأ الماركة"
        titleEn="Edit brand origin"
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
            titleAr: "تعديل منشأ الماركة",
            titleEn: "Edit brand origin",
            link: "/",
          },
        ]}
      />
      <div className="flex flex-col gap-8 md:p-8 p-2">
        <div className="flex flex-col gap-4 lg:p-8 p-2 bg-white rounded-2xl">
          <div className="flex md:flex-row flex-col gap-4">
            <div className="flex-1">
              <DashboardInput
                label={t("arBrandName")}
                value={arBrandName}
                onChange={setArBrandName}
                placeholder="أوروبا"
              />
            </div>
            <DashboardInput
              label={t("enBrandName")}
              value={enBrandName}
              onChange={setEnBrandName}
              placeholder={t("writeHere")}
            />
          </div>

          <DashboardButton titleAr="حفظ" titleEn="Save" onClick={handleSave} isLoading={loading}/>
        </div>
      </div>
    </div>
  );
};

export default EditBrandOrigins;
