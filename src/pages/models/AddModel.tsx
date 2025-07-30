import DashboardButton from "@/components/general/dashboard/DashboardButton";
import DashboardHeader from "@/components/general/dashboard/DashboardHeader";
import { Input, Select, SelectItem } from "@heroui/react";
import React from "react";
import { useParams } from "react-router";

const AddBrand = () => {
  const [selectedAgent, setSelectedAgent] = React.useState("");
  const params = useParams();
  const brandId = params.id;

  const isEdit = Boolean(brandId);

  const agents = [
    { label: "وكيل 1", value: "agent1" },
    { label: "وكيل 2", value: "agent2" },
    { label: "وكيل 3", value: "agent3" },
  ];

  // const oldValues = {
  //   image: "aaa",
  //   name: "car name",
  // };

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
              <Input
                label="اسم الموديل ( باللغة العربية )"
                variant="bordered"
                placeholder=" تويوتا"
                classNames={{ label: "mb-2 text-base" }}
                size="lg"
              />
              <Select
                className="mt-4"
                size={"lg"}
                variant="bordered"
                label="الوكيل"
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
              label=" اسم الموديل ( باللغة الانجليزية )"
              variant="bordered"
              placeholder="اكتب هنا"
              className="flex-1"
              classNames={{ label: "mb-2 text-base" }}
              size="lg"
            />
          </div>

          <DashboardButton title="اضافة" />
        </div>
      </div>
    </div>
  );
};

export default AddBrand;
