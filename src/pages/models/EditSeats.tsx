import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import DashboardButton from "@/components/general/dashboard/DashboardButton";
import DashboardHeader from "@/components/general/dashboard/DashboardHeader";
import DashboardInput from "@/components/general/DashboardInput";
import { updateNumberOfSeats } from "@/api/models/seats/editNumOfSeats";

const EditSeats = () => {
  const { t } = useTranslation("models");
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [arSeatsNumbers, setArSeatsNumbers] = useState("");
  const [enSeatsNumbers, setEnSeatsNumbers] = useState("");
  const [, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSave = async () => {
    if (!id) {
      setError("Invalid seat ID");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      await updateNumberOfSeats(Number(id), {
        name: { ar: arSeatsNumbers, en: enSeatsNumbers },
      });
      navigate("/models");
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to update seats number");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <DashboardHeader
        titleAr="تعديل عدد المقاعد"
        titleEn="Edit number of seats"
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
            titleAr: "تعديل عدد المقاعد",
            titleEn: "Edit number of seats",
            link: "/",
          },
        ]}
      />
      <div className="flex flex-col gap-8 p-8">
        <div className="flex flex-col gap-4 p-8 bg-white rounded-2xl">
          <div className="flex gap-4">
            <div className="flex-1">
              <DashboardInput
                label={t("arSeatsNumbers")}
                value={arSeatsNumbers}
                onChange={(val) => {
                  setArSeatsNumbers(val);
                  if (error) setError(null);
                }}
                placeholder="6"
              />
            </div>
            <DashboardInput
              label={t("enSeatsNumbers")}
              value={enSeatsNumbers}
              onChange={(val) => {
                setEnSeatsNumbers(val);
                if (error) setError(null);
              }}
              placeholder={t("writeHere")}
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

export default EditSeats;
