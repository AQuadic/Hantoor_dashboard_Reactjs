import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import DashboardButton from "@/components/general/dashboard/DashboardButton";
import DashboardHeader from "@/components/general/dashboard/DashboardHeader";
import DashboardInput from "@/components/general/DashboardInput";
import { postNumberOfSeats } from "@/api/models/seats/postNumOfSeats";
import toast from "react-hot-toast";

const AddSeats = () => {
  const { t } = useTranslation("models");
  const navigate = useNavigate();

  const [arSeatsNumbers, setArSeatsNumbers] = useState("");
  const [enSeatsNumbers, setEnSeatsNumbers] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <div>
      <DashboardHeader
        titleAr="اضافة عدد مقاعد جديدة"
        titleEn="Add new seats"
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
            titleAr: "اضافة عدد مقاعد جديدة",
            titleEn: "Add new seats",
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
                onChange={(value: string) => {
                  const numericValue = value.replace(/\D/g, "");
                  setArSeatsNumbers(numericValue);
                }}
                placeholder={t("writeHere")}
              />
            </div>
            <DashboardInput
              label={t("enSeatsNumbers")}
              value={enSeatsNumbers}
              onChange={(value: string) => {
                  const numericValue = value.replace(/\D/g, "");
                  setEnSeatsNumbers(numericValue);
                }}
              placeholder={t("writeHere")}
            />
          </div>

          <DashboardButton
            titleAr={loading ? "...جاري الإضافة" : "اضافة"}
            titleEn={loading ? "Adding..." : "Add"}
            isLoading={loading}
            onClick={async () => {
              if (arSeatsNumbers !== enSeatsNumbers) {
                toast.dismiss()
                toast.error(t("numbersMustMatch"));
                return;
              }

              setLoading(true);
              try {
                await postNumberOfSeats({
                  name: {
                    ar: arSeatsNumbers,
                    en: enSeatsNumbers,
                  },
                });
                toast.success(t("seatsAddedSuccessfully"));
                navigate("/models?section=Number of Seats");
              } catch (error: any) {
                const errorMsg =
                  error?.response?.data?.message ||
                  error?.message ||
                  t("somethingWentWrong");
                  toast.dismiss()
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

export default AddSeats;
