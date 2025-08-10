import DashboardButton from "@/components/general/dashboard/DashboardButton";
import DashboardHeader from "@/components/general/dashboard/DashboardHeader";
import DashboardInput from "@/components/general/DashboardInput";
import { Select, SelectItem } from "@heroui/react";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";

const AddBrand = () => {
  const [, setSelectedAgent] = React.useState("");
  const [arModelName, setArModelName] = useState("");
  const [enModelName, setEnModelName] = useState("");
  const params = useParams();
  const brandId = params.id;

  const isEdit = Boolean(brandId);

  const agents = [
    { label: "وكيل 1", value: "agent1" },
    { label: "وكيل 2", value: "agent2" },
    { label: "وكيل 3", value: "agent3" },
  ];

  const { t } = useTranslation("models");

  return (
    <div>
      <DashboardHeader
        titleAr={isEdit ? "تعديل موديل" : "اضافة موديل جديد"}
        titleEn={isEdit ? "Edit Model" : "Add Model"}
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
            titleAr: isEdit ? "تعديل موديل" : "اضافة موديل جديدة",
            titleEn: isEdit ? "Edit Model" : "Add Model",
            link: isEdit ? `/model/${brandId}` : "/brands/add",
          },
        ]}
      />
      <div className="flex flex-col gap-8 p-8">
        <div className="flex flex-col gap-4 p-8 bg-white rounded-2xl">
          <div className="flex gap-4">
            <div className="flex-1">
              <DashboardInput
                label={t('arModelName')}
                value={arModelName}
                onChange={setArModelName}
                placeholder=" تويوتا"
              />
              <Select
                className="mt-4"
                size={"lg"}
                variant="bordered"
                label={t('agent')}
                onSelectionChange={(key) => setSelectedAgent(key as string)}
              >
                {agents.map((agent) => (
                  <SelectItem key={agent.value} textValue={agent.label}>
                    {agent.label}
                  </SelectItem>
                ))}
              </Select>
            </div>
            <DashboardInput
              label={t('enModelName')}
              value={enModelName}
              onChange={setEnModelName}
              placeholder={t('writeHere')}
            />
          </div>

          <DashboardButton titleAr="اضافة" titleEn="Add" />
        </div>
      </div>
    </div>
  );
};

export default AddBrand;
