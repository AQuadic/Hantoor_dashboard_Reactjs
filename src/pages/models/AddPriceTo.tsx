import DashboardButton from "@/components/general/dashboard/DashboardButton";
import DashboardHeader from "@/components/general/dashboard/DashboardHeader";
import { Input, Select, SelectItem } from "@heroui/react";
import React from "react";
import { useParams } from "react-router";

const AddPriceTo = () => {
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
        titleAr="اضافة سعر جديد"
        titleEn="Add a new price"
        items={[
          {
            titleAr: "لوحة التحكم",
            titleEn: "Dashboard",
            link: "/",
          },
          {
            titleAr: "اقسام السيارات ",
            titleEn: " Car Sections",
            link: "/models",
          },
          {
            titleAr:"اضافة سعر جديد",
            titleEn: "Add a new price",
            link: isEdit ? `/model/${brandId}` : "/brands/add",
          },
        ]}
      />
      <div className="flex flex-col gap-8 p-8">
        <div className="flex flex-col gap-4 p-8 bg-white rounded-2xl">
          <div className="flex gap-4">
            <div className="flex-1">
              <Input
                label="السعر ( باللغة العربية )"
                variant="bordered"
                placeholder=" 500.000"
                classNames={{ label: "mb-2 text-base" }}
                size="lg"
              />
              <Select
                className="mt-4"
                size={"lg"}
                variant="bordered"
                label="البلد"
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
              label="السعر ( باللغة الانجليزية )"
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

export default AddPriceTo;
