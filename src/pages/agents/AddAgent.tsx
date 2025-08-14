import AddMaintenanceCenter from "@/components/agents/AddMaintenanceCenter";
import AddSalesShowrooms from "@/components/agents/AddSalesShowrooms";
import DashboardHeader from "@/components/general/dashboard/DashboardHeader";
import DashboardInput from "@/components/general/DashboardInput";
import TabsFilter from "@/components/general/dashboard/TabsFilter";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Brand, BrandsApiResponse, fetchBrands } from "@/api/brand/fetchBrands";
import {
  createAgent,
  CreateAgentPayload,
  AgentCenter,
} from "@/api/agents/fetchAgents";
import DashboardButton from "@/components/general/dashboard/DashboardButton";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

interface SubordinatesHeaderProps {
  selectedFilter: string;
  setSelectedFilter: React.Dispatch<React.SetStateAction<string>>;
}

const AddAgent: React.FC<SubordinatesHeaderProps> = ({
  selectedFilter,
  setSelectedFilter,
}) => {
  const { t, i18n } = useTranslation("agents");
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [arName, setArName] = useState("");
  const [enName, setEnName] = useState("");
  const [emailLink, setEmailLink] = useState("");
  const [selectedBrandId, setSelectedBrandId] = useState<string>("");
  const [centers, setCenters] = useState<AgentCenter[]>([
    {
      name: { ar: "", en: "" },
      description: { ar: "", en: "" },
      phone: "",
      whatsapp: "",
      type: "center",
      is_active: true,
    },
    {
      name: { ar: "", en: "" },
      description: { ar: "", en: "" },
      phone: "",
      whatsapp: "",
      type: "show_room",
      is_active: true,
    },
  ]);

  const page = 1;
  const { data: brands } = useQuery<BrandsApiResponse>({
    queryKey: ["brands", page],
    queryFn: ({ queryKey }) => fetchBrands(queryKey[1] as number),
  });

  const selectedBrand = brands?.data.find(
    (brand: Brand) => brand.id === Number(selectedBrandId)
  );

  const createAgentMutation = useMutation({
    mutationFn: createAgent,
    onSuccess: () => {
      toast.success(t("agentCreatedSuccess"));
      queryClient.invalidateQueries({ queryKey: ["agents"] });
      navigate("/agents");
    },
    onError: (error: unknown) => {
      let errorMessage = t("agentCreationError");
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (
        typeof error === "object" &&
        error !== null &&
        "response" in error
      ) {
        const responseError = error as {
          response?: { data?: { message?: string } };
        };
        errorMessage = responseError.response?.data?.message || errorMessage;
      }
      toast.error(errorMessage);
    },
  });

  const handleSubmit = () => {
    if (!arName || !enName) {
      toast.error(t("pleaseFillAllFields"));
      return;
    }

    if (!selectedBrandId) {
      toast.error(t("pleaseSelectBrand"));
      return;
    }

    if (centers.length === 0) {
      toast.error(t("pleaseAddAtLeastOneCenter"));
      return;
    }

    const centerToSave = centers[0];

    if (
      !centerToSave.name?.ar ||
      !centerToSave.name?.en ||
      !centerToSave.phone ||
      !centerToSave.whatsapp ||
      !centerToSave.description?.ar ||
      !centerToSave.description?.en
    ) {
      toast.error(t("centerMissingRequiredFields"));
      return;
    }

    const payload: CreateAgentPayload = {
      name: {
        ar: arName,
        en: enName,
      },
      is_active: true,
      link: emailLink,
      brand_id: Number(selectedBrandId),
      centers: {
        name: {
          ar: centerToSave.name.ar,
          en: centerToSave.name.en,
        },
        description: {
          ar: centerToSave.description.ar,
          en: centerToSave.description.en,
        },
        phone: centerToSave.phone,
        whatsapp: centerToSave.whatsapp,
        type: centerToSave.type,
        is_active: "1",
      },
    };

    createAgentMutation.mutate(payload);
  };

  // No longer needed: addCenter/removeCenter. All state is managed in centers/setCenters and handled in child components.

  return (
    <section>
      <div className="pt-0 pb-2 bg-white ">
        <DashboardHeader
          titleAr="اضافة وكيل جديد"
          titleEn="Add new agent"
          items={[
            { titleAr: "لوحة التحكم", titleEn: "Dashboard", link: "/" },
            { titleAr: "الوكلاء", titleEn: "Agents", link: "/agents" },
            { titleAr: "اضافة وكيل جديد", titleEn: "Add new agent", link: "/" },
          ]}
        />
      </div>
      <div className=" bg-white mt-3 rounded-[15px] py-[19px] px-[29px] mx-8">
        <div className="flex md:flex-row flex-col items-center gap-[15px] mt-4">
          {/* Arabic name */}
          <div className="relative w-full">
            <DashboardInput
              label={t("arName")}
              value={arName}
              onChange={setArName}
              placeholder="الشركة الدولية التجارية"
            />
          </div>
          {/* English name */}
          <div className="relative w-full">
            <DashboardInput
              label={t("enName")}
              value={enName}
              onChange={setEnName}
              placeholder={t("writeHere")}
            />
          </div>
        </div>

        <div className="flex md:flex-row flex-col items-center gap-[15px] mt-4">
          {/* Link */}
          <div className="relative w-full">
            <DashboardInput
              label={t("emailLink")}
              value={emailLink}
              onChange={setEmailLink}
              placeholder={t("writeHere")}
            />
          </div>

          <div className="relative w-full border border-gray-300 rounded-lg p-3 text-sm">
            <p className="rtl:text-right text-black text-sm">{t("brand")}</p>
            <div className="flex items-center justify-between gap-1">
              <span className="text-gray-500 text-sm">
                {selectedBrand
                  ? i18n.language === "ar"
                    ? selectedBrand.name.ar
                    : selectedBrand.name.en
                  : t("selectBrand")}
              </span>

              <select
                className="text-blue-600 bg-transparent focus:outline-none text-sm cursor-pointer"
                value={selectedBrandId}
                onChange={(e) => setSelectedBrandId(e.target.value)}
              >
                <option value="">{t("selectBrand")}</option>
                {brands?.data?.map((brand) => (
                  <option key={brand.id} value={brand.id}>
                    {i18n.language === "ar" ? brand.name.ar : brand.name.en}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <hr className="my-[11px]" />

        <TabsFilter
          classNames="!px-0"
          filters={[
            {
              titleAr: "اضافة مراكز الصيانة",
              titleEn: "Add maintenance centers",
            },
            {
              titleAr: "اضافة معارض البيع",
              titleEn: "Add sales Showrooms",
            },
          ]}
          selectedFilter={selectedFilter}
          setSelectedFilter={setSelectedFilter}
        />
        {selectedFilter === "Add maintenance centers" && (
          <AddMaintenanceCenter
            centers={centers.filter((c) => c.type === "center")}
            setCenters={(newCenters) => {
              // Merge with any show_room centers
              setCenters([
                ...newCenters,
                ...centers.filter((c) => c.type === "show_room"),
              ]);
            }}
            type="center"
          />
        )}

        {selectedFilter === "Add sales Showrooms" && (
          <AddSalesShowrooms
            centers={centers.filter((c) => c.type === "show_room")}
            setCenters={(newShowrooms) => {
              // Merge with any center centers
              setCenters([
                ...centers.filter((c) => c.type === "center"),
                ...newShowrooms,
              ]);
            }}
            type="show_room"
          />
        )}

        <div className="mt-6 flex justify-end">
          <DashboardButton
            titleAr="حفظ"
            titleEn="Save"
            onClick={handleSubmit}
            isLoading={createAgentMutation.isPending}
          />
        </div>
      </div>
    </section>
  );
};

export default AddAgent;
