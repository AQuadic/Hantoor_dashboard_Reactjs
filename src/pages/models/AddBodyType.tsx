import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams, useNavigate } from "react-router";
import { Input, Select, SelectItem } from "@heroui/react";
import DashboardButton from "@/components/general/dashboard/DashboardButton";
import DashboardHeader from "@/components/general/dashboard/DashboardHeader";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { getModels, GetModelsResponse } from "@/api/models/models/getModels";
import { postVehicleBody } from "@/api/models/structureType/postStructure";

const AddBodyType = () => {
  const { t, i18n } = useTranslation("models");
  const language = i18n.language || "en";

  const params = useParams();
  const brandId = params.id;
  const isEdit = Boolean(brandId);

  const navigate = useNavigate();

  const [arName, setArName] = useState("");
  const [enName, setEnName] = useState("");
  const [selectedModel, setSelectedModel] = useState<string>("");

  // Fetch models for the select dropdown
  const { data: modelsResponse = { data: [], meta: { totalItems: 0, totalPages: 1, itemsPerPage: 10, currentPage: 1 } }, isLoading } = useQuery<GetModelsResponse, Error>({
    queryKey: ["models-list", 1, ""],
    queryFn: ({ queryKey }) => {
      const [_key, page = 1, search = ""] = queryKey as [string, number, string];
      return getModels(page, 10, search);
    },
  });
  const modelsData = modelsResponse.data ?? [];

  const handleSubmit = async () => {
    if (!arName || !enName || !selectedModel) {
      toast.error(t("fillAllFields") || "Please fill all fields");
      return;
    }

    await postVehicleBody({
      name: { ar: arName, en: enName },
      vehicle_model_id: selectedModel,
      is_active: true,
    });

    toast.success(t('bodyTypeAdded'));
    navigate("/models?section=Structure+Types&page=1");
  };

  return (
    <div>
      <DashboardHeader
        titleAr="اضافة نوع هيكل جديد"
        titleEn="Add a new structure type"
        items={[
          { titleAr: "الصفحة الرئيسية", titleEn: "Home", link: "/" },
          { titleAr: "اقسام السيارات ", titleEn: "Car Sections", link: "/" },
          {
            titleAr: "اضافة نوع هيكل جديد",
            titleEn: "Add a new structure type",
            link: isEdit ? `/model/${brandId}` : "/brands/add",
          },
        ]}
      />

      <div className="flex flex-col gap-8 md:p-8 p-2">
        <div className="flex flex-col gap-4 md:p-8 p-2 bg-white rounded-2xl">
          <div className="flex md:flex-row flex-col gap-4">
            <div className="flex-1">
              <Input
                label={t("arStructureName")}
                variant="bordered"
                placeholder={t("writeHere")}
                value={arName}
                onChange={(e) => setArName(e.target.value)}
                classNames={{ label: "mb-2 text-base" }}
                size="lg"
                />
              <Select
                className="mt-4"
                size="lg"
                variant="bordered"
                label={t("model")}
                selectedKeys={selectedModel ? [selectedModel] : []}
                onSelectionChange={(keys) =>
                  setSelectedModel(Array.from(keys)[0] as string)
                }
              >
                {isLoading
                  ? [<SelectItem key="loading">Loading...</SelectItem>]
                  : modelsData.map((model) => (
                      <SelectItem key={model.id} textValue={model.name[language as "ar" | "en"]}>
                        {model.name[language as "ar" | "en"]}
                      </SelectItem>
                    ))}
              </Select>
            </div>

            <Input
              label={t("enStructureName")}
              variant="bordered"
              placeholder={t('writeHere')}
              value={enName}
              onChange={(e) => setEnName(e.target.value)}
              className="flex-1"
              classNames={{ label: "mb-2 text-base" }}
              size="lg"
            />
          </div>

          <DashboardButton titleAr="اضافة" titleEn="Add" onClick={handleSubmit} />
        </div>
      </div>
    </div>
  );
};

export default AddBodyType;
