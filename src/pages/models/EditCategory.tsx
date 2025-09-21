import { useParams, useNavigate } from "react-router-dom";
import {
  updateVehicleClass,
  getVehicleClassById,
  UpdateVehicleClassPayload,
} from "@/api/categories/editCategory";
import DashboardButton from "@/components/general/dashboard/DashboardButton";
import DashboardHeader from "@/components/general/dashboard/DashboardHeader";
import { Input } from "@heroui/react";
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";

const EditCategory = () => {
  const { t } = useTranslation("models");
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [arName, setArName] = useState("");
  const [enName, setEnName] = useState("");
  const [selectedCarType, setSelectedCarType] = useState<number | undefined>(
    undefined
  );
  const [, setLoading] = useState(false);
  useEffect(() => {
    if (!id) return;
    const fetchClass = async () => {
      try {
        const data = await getVehicleClassById(Number(id));
        const classData = data as {
          name: { ar: string; en: string };
          vehicle_type_id: number | string;
        };
        setArName(classData.name.ar);
        setEnName(classData.name.en);
        setSelectedCarType(Number(classData.vehicle_type_id));
      } catch (error: unknown) {
        const err = error as { message?: string };
        toast.error(err.message || "Failed to load category");
      }
    };
    fetchClass();
  }, [id]);

  const handleSave = async () => {
    if (!id) return toast.error("ID not found");
    if (!selectedCarType) return toast.error(t("Please select a vehicle type"));

    const payload: UpdateVehicleClassPayload = {
      name: { ar: arName, en: enName },
      vehicle_type_id: selectedCarType.toString(),
    };

    try {
      setLoading(true);
      await updateVehicleClass(Number(id), payload);
      toast.success(t("categoryUpdated"));
      navigate("/models?section=Categories");
    } catch (error: unknown) {
      const err = error as { message?: string };
      toast.error(err.message || t("Failed to update category"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="pt-0 pb-2 bg-white ">
        <DashboardHeader
          titleAr="تعديل الفئة"
          titleEn="Edit category"
          items={[
            { titleAr: "لوحة التحكم", titleEn: "Dashboard", link: "/" },
            {
              titleAr: " اقسام السيارات",
              titleEn: "Car sections",
              link: "/models",
            },
            { titleAr: "تعديل الفئة", titleEn: "Edit category" },
          ]}
        />
      </div>
      <div className="flex flex-col gap-8 md:p-8 p-2">
        <div className="flex flex-col gap-4 md:p-8 p-2 bg-white rounded-2xl">
          <div className="flex md:flex-row flex-col gap-4">
            <div className="w-full">
              <Input
                label={t("arcategoryName")}
                value={arName}
                placeholder={t("writeHere")}
                onChange={(e) => setArName(e.target.value)}
                variant="bordered"
                size="lg"
                classNames={{ label: "mb-2 text-base" }}
              />
            </div>
            <Input
              label={t("encategoryName")}
              value={enName}
              placeholder={t("writeHere")}
              onChange={(e) => setEnName(e.target.value)}
              variant="bordered"
              size="lg"
              classNames={{ label: "mb-2 text-base" }}
            />
          </div>

          <DashboardButton titleAr="حفظ" titleEn="Save" onClick={handleSave} />
        </div>
      </div>
    </div>
  );
};

export default EditCategory;
