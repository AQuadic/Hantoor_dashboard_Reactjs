import DashboardButton from "@/components/general/dashboard/DashboardButton";
import DashboardHeader from "@/components/general/dashboard/DashboardHeader";
import DashboardInput from "@/components/general/DashboardInput";
import { Select, SelectItem } from "@heroui/react";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { fetchAgents } from "@/api/agents/fetchAgents";
import Loading from "@/components/general/Loading";
import { postVehicleModel } from "@/api/models/models/addModels";
import toast from "react-hot-toast";

const AddBrand = () => {
  const [selectedAgent, setSelectedAgent] = useState<string>("");
  const [arModelName, setArModelName] = useState("");
  const [enModelName, setEnModelName] = useState("");
  const [, setIsSubmitting] = useState(false);

  const params = useParams();
  const brandId = params.id;

  const isEdit = Boolean(brandId);

  const { t, i18n } = useTranslation("models");
  const language = i18n.language || "en";

  const { data: agentsData, isLoading } = useQuery({
    queryKey: ["agents-list"],
    queryFn: () => fetchAgents(1, ""), 
  });

  const handleSubmit = async () => {
    if (!arModelName || !enModelName || !selectedAgent) {
      toast.error(t("fillAllFields") || "Please fill all fields");
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await postVehicleModel({
        name: {
          ar: arModelName,
          en: enModelName,
        },
        is_active: true,
        agent_id: selectedAgent,
      });

      if (response.data) {
        toast.success(response.message || "Model added successfully");
        setArModelName("");
        setEnModelName("");
        setSelectedAgent("");
      } else {
        toast.error(response.message || "Something went wrong");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error submitting model");
    } finally {
      setIsSubmitting(false);
    }
  };

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
                label={t("arModelName")}
                value={arModelName}
                onChange={setArModelName}
                placeholder=" تويوتا"
              />

              {isLoading ? (
                <Loading />
              ) : (
                <Select
                  className="mt-4"
                  size={"lg"}
                  variant="bordered"
                  label={t("agent")}
                  selectedKeys={selectedAgent ? [selectedAgent] : []}
                  onSelectionChange={(keys) =>
                    setSelectedAgent(Array.from(keys)[0] as string)
                  }
                >
                  {(agentsData?.data || []).map((agent: any) => (
                    <SelectItem
                      key={agent.id}
                      textValue={agent.name?.[language]}
                    >
                      {agent.name?.[language]}
                    </SelectItem>
                  ))}
                </Select>
              )}
            </div>
            <DashboardInput
              label={t("enModelName")}
              value={enModelName}
              onChange={setEnModelName}
              placeholder={t("writeHere")}
            />
          </div>

          <DashboardButton titleAr="اضافة" titleEn="Add" onClick={handleSubmit}/>
        </div>
      </div>
    </div>
  );
};

export default AddBrand;
