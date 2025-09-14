import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import DashboardButton from "@/components/general/dashboard/DashboardButton";
import { Input } from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import {
  updateBodyType,
  BodyType,
} from "@/api/models/structureType/editStructure";
import { getStructureById } from "@/api/models/structureType/getStructureById";
import toast from "react-hot-toast";
import DashboardHeader from "@/components/general/dashboard/DashboardHeader";

const EditBodyType = () => {
  const { t } = useTranslation("models");
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [nameAr, setNameAr] = useState("");
  const [nameEn, setNameEn] = useState("");

  const { data: bodyType } = useQuery<BodyType>({
    queryKey: ["body-type", id],
    queryFn: () => getStructureById(Number(id)),
    enabled: !!id,
  });

  useEffect(() => {
    if (bodyType) {
      setNameAr(bodyType.name.ar);
      setNameEn(bodyType.name.en);
    }
  }, [bodyType]);

  const handleSave = async () => {
    if (!id) return;

    try {
      await updateBodyType(Number(id), {
        name: { ar: nameAr, en: nameEn },
      });
      toast.success(t("bodyTypeUpdated"));
      navigate("/models?section=Structure+Types&page=1");
    } catch (err: unknown) {
      console.error(err);
      const message =
        err instanceof Error ? err.message : "Failed to update body type";
      toast.error(message);
    }
  };

  return (
    <div>
      <div className="pt-0 pb-2 bg-white ">
        <DashboardHeader
          titleAr="تعديل نوع الهيكل"
          titleEn="Edit structure type"
          items={[
            { titleAr: "لوحة التحكم", titleEn: "Dashboard", link: "/" },
            {
              titleAr: "اقسام السيارات",
              titleEn: "Car sections",
              link: "/models",
            },
            { titleAr: "تعديل نوع الهيكل", titleEn: "Edit structure type" },
          ]}
        />
      </div>
      <div className="bg-white mt-3 rounded-[15px] py-[19px] px-[29px] md:mx-8 mx-2">
        <div className="flex flex-col md:flex-row gap-[15px]">
          <div className="w-full">
            <Input
              label={t("arStructureName")}
              variant="bordered"
              placeholder={t("writeHere")}
              value={nameAr}
              onChange={(e) => setNameAr(e.target.value)}
              classNames={{ label: "mb-2 text-base" }}
              size="md"
            />
          </div>
          <div className="w-full">
            <Input
              label={t("enStructureName")}
              variant="bordered"
              placeholder={t("writeHere")}
              value={nameEn}
              onChange={(e) => setNameEn(e.target.value)}
              classNames={{ label: "mb-2 text-base" }}
              size="md"
            />
          </div>
        </div>

        <div className="mt-4">
          <DashboardButton titleAr="حفظ" titleEn="Save" onClick={handleSave} />
        </div>
      </div>
    </div>
  );
};

export default EditBodyType;
