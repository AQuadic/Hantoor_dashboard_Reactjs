import { addVehicleType } from "@/api/models/carTypes/addCarType";
import { useVehicleBodies } from "@/api/models/structureType/getStructure";
import DashboardButton from "@/components/general/dashboard/DashboardButton";
import DashboardHeader from "@/components/general/dashboard/DashboardHeader";
import { Input, Select, SelectItem } from "@heroui/react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router";

const AddCarTypes = () => {
  const { t, i18n } = useTranslation("models");
  const [selectedStructure, setSelectedStructure] = useState<string | null>(null);
  const params = useParams();
  const brandId = params.id;
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [arType, setArType] = useState("");
  const [enType, setEnType] = useState("");

  const isEdit = Boolean(brandId);

  const { data: structures, isLoading } = useVehicleBodies({
    pagination: false,
  });

  return (
    <div>
      <DashboardHeader
        titleAr="اضافة نوع جديد"
        titleEn="Add a new type"
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
            titleAr:"اضافة نوع جديد",
            titleEn: "Add a new type",
            link: isEdit ? `/model/${brandId}` : "/brands/add",
          },
        ]}
      />
      <div className="flex flex-col gap-8 p-8">
        <div className="flex flex-col gap-4 p-8 bg-white rounded-2xl">
          <div className="flex gap-4">
            <div className="flex-1">
              <Input
                label={t('arType')}
                variant="bordered"
                placeholder=" SUV"
                classNames={{ label: "mb-2 text-base" }}
                size="lg"
                value={arType}
                onChange={(e) => setArType(e.target.value)}
              />
              <Select
                className="mt-4"
                size={"lg"}
                variant="bordered"
                label={t('structure')}
                isLoading={isLoading}
                selectedKeys={selectedStructure ? [selectedStructure] : []}
                onSelectionChange={(keys) => {
                  const key = Array.from(keys)[0] as string;
                  setSelectedStructure(key);
                }}
              >
                {(structures ?? []).map((structure) => (
                  <SelectItem
                    key={structure.id.toString()}
                    textValue={structure.name[i18n.language as "ar" | "en"]}
                  >
                    {structure.name[i18n.language as "ar" | "en"]}
                  </SelectItem>
                ))}
              </Select>
            </div>
            <Input
              label={t('enType')}
              variant="bordered"
              placeholder={t('writeHere')}
              className="flex-1"
              classNames={{ label: "mb-2 text-base" }}
              size="lg"
              value={enType}
              onChange={(e) => setEnType(e.target.value)}
            />
          </div>

          <DashboardButton
            titleAr={loading ? "...جاري الإضافة" : "اضافة"}
            titleEn={loading ? "Adding..." : "Add"}
            isLoading={loading}
            onClick={async () => {
              if (!selectedStructure) {
                toast.error(t("structure") + " " + t("isRequired"));
                return;
              }

              setLoading(true);
              try {
                await addVehicleType({
                  name: {
                    ar: arType,
                    en: enType,
                  },
                  body_type_id: Number(selectedStructure),
                  is_active: true,
                });
                toast.success(t("carTypeAdded"));
                navigate("/models?section=Car Types");
              } catch (error: any) {
                const errorMsg =
                  error?.response?.data?.message ||
                  error?.message ||
                  t("somethingWentWrong");
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

export default AddCarTypes;
