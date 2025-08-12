import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useParams, useNavigate } from "react-router-dom";
import DashboardButton from "@/components/general/dashboard/DashboardButton";
import DashboardHeader from "@/components/general/dashboard/DashboardHeader";
import DashboardInput from "@/components/general/DashboardInput";
import { updateBrandOrigin } from "@/api/models/brandOrigin/editBrandOrigin";
import { getBrandOrigin } from "@/api/models/brandOrigin/getBrandOrigin";

const EditBrandOrigins = () => {
  const { t } = useTranslation("models");
  const { id } = useParams();
  const brandOriginId = Number(id);
  const navigate = useNavigate();

  const [arBrandName, setArBrandName] = useState("");
  const [enBrandName, setEnBrandName] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (!brandOriginId) return;

    const fetchBrandOrigin = async () => {
      setFetching(true);
      try {
        const brandOrigins = await getBrandOrigin();
        const brand = brandOrigins.find((b) => b.id === brandOriginId);
        if (!brand) {
          return;
        }
        setArBrandName(brand.name.ar);
        setEnBrandName(brand.name.en);
        setIsActive(brand.is_active);
      } catch {
        // Handle error
      } finally {
        setFetching(false);
      }
    };

    fetchBrandOrigin();
  }, [brandOriginId]);

  const handleSave = async () => {
    setLoading(true);
    try {
      await updateBrandOrigin(brandOriginId, {
        name: { ar: arBrandName, en: enBrandName },
        is_active: isActive,
      });
      navigate("/models");
    } catch {
      // handle error
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return <div>Loading...</div>;
  }

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
