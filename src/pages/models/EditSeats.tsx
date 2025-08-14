import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import DashboardButton from "@/components/general/dashboard/DashboardButton";
import DashboardHeader from "@/components/general/dashboard/DashboardHeader";
import DashboardInput from "@/components/general/DashboardInput";
import { updateNumberOfSeats } from "@/api/models/seats/editNumOfSeats";
import { getSeatById, Seat } from "@/api/models/seats/getSeatById";
import toast from "react-hot-toast";
import Loading from "@/components/general/Loading";

const EditSeats = () => {
  const { t } = useTranslation("models");
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: seat, isLoading, error } = useQuery<Seat>({
    queryKey: ["seat", id],
    queryFn: () => getSeatById(Number(id)),
    enabled: !!id,
    retry: false,
  });

  const [arSeatsNumbers, setArSeatsNumbers] = useState("");
  const [enSeatsNumbers, setEnSeatsNumbers] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (seat) {
      setArSeatsNumbers(seat.name.ar);
      setEnSeatsNumbers(seat.name.en);
    }
  }, [seat]);

  const handleSave = async () => {
    if (!id) {
      toast.error(t("invalidSeatId") || "Invalid seat ID");
      return;
    }
    setLoading(true);
    try {
      await updateNumberOfSeats(Number(id), {
        name: { ar: arSeatsNumbers, en: enSeatsNumbers },
      });
      toast.success(t("seatsUpdatedSuccessfully"));
      navigate("/models");
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
        titleAr="تعديل عدد المقاعد"
        titleEn="Edit number of seats"
        items={[
          { titleAr: "الصفحة الرئيسية", titleEn: "Home", link: "/" },
          { titleAr: "اقسام السيارات ", titleEn: "Car Sections", link: "/models" },
          { titleAr: "تعديل عدد المقاعد", titleEn: "Edit number of seats", link: "/" },
        ]}
      />
      <div className="flex flex-col gap-8 md:p-8 p-2">
        <div className="flex flex-col gap-4 lg:p-8 p-2 bg-white rounded-2xl">
          <div className="flex md:flex-row flex-col gap-4">
            <div className="flex-1">
              <DashboardInput
                label={t("arSeatsNumbers")}
                value={arSeatsNumbers}
                onChange={setArSeatsNumbers}
                placeholder="6"
              />
            </div>
            <DashboardInput
              label={t("enSeatsNumbers")}
              value={enSeatsNumbers}
              onChange={setEnSeatsNumbers}
              placeholder={t("writeHere")}
            />
          </div>

          <DashboardButton
            titleAr={loading ? "...جاري الحفظ" : "حفظ"}
            titleEn={loading ? "Saving..." : "Save"}
            onClick={handleSave}
            isLoading={loading}
          />
        </div>
      </div>
    </div>
  );
};

export default EditSeats;
