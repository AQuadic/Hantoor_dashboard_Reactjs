import DashboardButton from "@/components/general/dashboard/DashboardButton";
import DashboardHeader from "@/components/general/dashboard/DashboardHeader";
import { Input, Select, SelectItem } from "@heroui/react";
import React from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";

const AddBodyType = () => {
  const { t } = useTranslation("models");
  const [, setSelectedAgent] = React.useState("");
  const params = useParams();
  const brandId = params.id;

  const isEdit = Boolean(brandId);

  const agents = [
    { label: "الموديل 1", value: "model1" },
    { label: "الموديل 2", value: "model2" },
    { label: "الموديل 3", value: "model3" },
  ];

  // const oldValues = {
  //   image: "aaa",
  //   name: "car name",
  // };

  return (
    <div>
      <DashboardHeader
        titleAr="اضافة نوع هيكل جديد"
        titleEn="Add a new structure type"
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
            titleAr:"اضافة نوع هيكل جديد",
            titleEn: "Add a new structure type",
            link: isEdit ? `/model/${brandId}` : "/brands/add",
          },
        ]}
      />
      <div className="flex flex-col gap-8 p-8">
        <div className="flex flex-col gap-4 p-8 bg-white rounded-2xl">
          <div className="flex gap-4">
            <div className="flex-1">
              <Input
                label={t('arStructureName')}
                variant="bordered"
                placeholder=" SUV"
                classNames={{ label: "mb-2 text-base" }}
                size="lg"
              />
              <Select
                className="mt-4"
                size={"lg"}
                variant="bordered"
                label={t('model')}
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
              label={t('enStructureName')}
              variant="bordered"
              placeholder="اكتب هنا"
              className="flex-1"
              classNames={{ label: "mb-2 text-base" }}
              size="lg"
            />
          </div>

            <DashboardButton titleAr="اضافة" titleEn="Add" />
        </div>
      </div>
    </div>
  );
};

export default AddBodyType;
