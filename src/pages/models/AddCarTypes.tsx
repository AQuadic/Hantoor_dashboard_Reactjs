import DashboardButton from "@/components/general/dashboard/DashboardButton";
import DashboardHeader from "@/components/general/dashboard/DashboardHeader";
import { Input, Select, SelectItem } from "@heroui/react";
import React from "react";
import { useParams } from "react-router";

const AddCarTypes = () => {
  const [, setSelectedAgent] = React.useState("");
  const params = useParams();
  const brandId = params.id;

  const isEdit = Boolean(brandId);

  const agents = [
    { label: "SUV", value: "model1" },
    { label: "SUV", value: "model2" },
    { label: "SUV", value: "model3" },
  ];

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
                label="اسم النوع ( باللغة العربية )"
                variant="bordered"
                placeholder=" SUV"
                classNames={{ label: "mb-2 text-base" }}
                size="lg"
              />
              <Select
                className="mt-4"
                size={"lg"}
                variant="bordered"
                label="الهيكل"
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
              label="اسم النوع ( باللغة الانجليزية )"
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

export default AddCarTypes;
