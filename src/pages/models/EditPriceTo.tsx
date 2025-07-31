import DashboardButton from "@/components/general/dashboard/DashboardButton";
import DashboardHeader from "@/components/general/dashboard/DashboardHeader";
import { Input, Select, SelectItem } from "@heroui/react";
import React from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";

const EditPriceTo = () => {
  const { t } = useTranslation("models");
  const [, setSelectedAgent] = React.useState("");
  const params = useParams();
  const brandId = params.id;

  const isEdit = Boolean(brandId);

  const agents = [
    { label: "الامارات", value: "model1" },
    { label: "مصر", value: "model2" },
    { label: "السعودية", value: "model3" },
  ];

  return (
    <div>
      <DashboardHeader
        titleAr="تعديل السعر"
        titleEn="Edit the price"
        items={[
          {
            titleAr: "لوحة التحكم",
            titleEn: "dashboard",
            link: "/",
          },
          {
            titleAr: "اقسام السيارات ",
            titleEn: " Car Sections",
            link: "/models",
          },
          {
            titleAr:"تعديل السعر",
            titleEn: "Edit the price",
            link: isEdit ? `/model/${brandId}` : "/brands/add",
          },
        ]}
      />
      <div className="flex flex-col gap-8 p-8">
        <div className="flex flex-col gap-4 p-8 bg-white rounded-2xl">
          <div className="flex gap-4">
            <div className="flex-1">
              <Input
                label={t('arPrice')}
                variant="bordered"
                placeholder=" 100.000"
                classNames={{ label: "mb-2 text-base" }}
                size="lg"
              />
              <Select
                className="mt-4"
                size={"lg"}
                variant="bordered"
                label={t('country')}
                onSelectionChange={(key) => setSelectedAgent(key as string)}
              >
                {agents.map((agent) => (
                  <SelectItem key={agent.value} textValue={agent.label}>
                    {agent.label}
                  </SelectItem>
                ))}
              </Select>
            </div>
            <Input
              label={t('enPrice')}
              variant="bordered"
              placeholder={t('writeHere')}
              className="flex-1"
              classNames={{ label: "mb-2 text-base" }}
              size="lg"
            />
          </div>

              <DashboardButton titleAr="حفظ" titleEn="Save" />
        </div>
      </div>
    </div>
  );
};

export default EditPriceTo;
