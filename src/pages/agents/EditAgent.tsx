import AddMaintenanceCenter from "@/components/agents/AddMaintenanceCenter";
import AddSalesShowrooms from "@/components/agents/AddSalesShowrooms";
import DashboardHeader from "@/components/general/dashboard/DashboardHeader";
import TabsFilter from "@/components/general/dashboard/TabsFilter";
import DashboardInput from "@/components/general/DashboardInput";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { BrandsApiResponse, fetchBrands } from "@/api/brand/fetchBrands";
import {
  fetchAgentById,
  updateAgent,
  UpdateAgentPayload,
  AgentCenter,
} from "@/api/agents/fetchAgents";
import DashboardButton from "@/components/general/dashboard/DashboardButton";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";

interface SubordinatesHeaderProps {
  selectedFilter: string;
  setSelectedFilter: React.Dispatch<React.SetStateAction<string>>;
}

const EditAgent: React.FC<SubordinatesHeaderProps> = ({
  selectedFilter,
  setSelectedFilter,
}) => {
  const { t, i18n } = useTranslation("agents");
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { id } = useParams<{ id: string }>();

  const [arName, setArName] = useState("");
  const [enName, setEnName] = useState("");
  const [emailLink, setEmailLink] = useState("");
  const [selectedBrandId, setSelectedBrandId] = useState<string>("");
  const [centers, setCenters] = useState<AgentCenter[]>([]);

  const page = 1;
  const { data: brands } = useQuery<BrandsApiResponse>({
    queryKey: ["brands", page],
    queryFn: ({ queryKey }) => fetchBrands(queryKey[1] as number),
  });

  const { data: agent, isLoading: isLoadingAgent } = useQuery({
    queryKey: ["agent", id],
    queryFn: () => fetchAgentById(Number(id)),
    enabled: !!id,
  });

  useEffect(() => {
    if (agent) {
      setArName(agent.name.ar);
      setEnName(agent.name.en);
      setEmailLink(agent.link || "");
      setSelectedBrandId(agent.brand_id?.toString() || "");

      // Initialize centers with at least one center and one showroom if none exist
      const existingCenters = agent.centers || [];
      const hasCenter = existingCenters.some((c) => c.type === "center");
      const hasShowroom = existingCenters.some((c) => c.type === "show_room");

      const initialCenters = [...existingCenters];

      // Add empty center if none exists
      if (!hasCenter) {
        initialCenters.push({
          name: { ar: "", en: "" },
          description: { ar: "", en: "" },
          phone: "",
          whatsapp: "",
          type: "center",
          is_active: "1",
        });
      }

      // Add empty showroom if none exists
      if (!hasShowroom) {
        initialCenters.push({
          name: { ar: "", en: "" },
          description: { ar: "", en: "" },
          phone: "",
          whatsapp: "",
          type: "show_room",
          is_active: "1",
        });
      }

      setCenters(initialCenters);
    }
  }, [agent]);

  const updateAgentMutation = useMutation({
    mutationFn: (data: UpdateAgentPayload) => updateAgent(Number(id), data),
    onSuccess: () => {
      toast.success(t("agentUpdatedSuccess"));
      queryClient.invalidateQueries({ queryKey: ["agents"] });
      queryClient.invalidateQueries({ queryKey: ["agent", id] });
      navigate("/agents");
    },
    onError: (error: unknown) => {
      let errorMessage = t("agentUpdateError");
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
      toast.error(t("pleaseFilAllFields"));
      return;
    }

    // Check if at least one center OR showroom is present and filled
    const validCenters = centers.filter(
      (center) =>
        center.name?.ar &&
        center.name?.en &&
        center.phone &&
        center.whatsapp &&
        center.description?.ar &&
        center.description?.en
    );

    if (validCenters.length === 0) {
      toast.error(t("pleaseAddAtLeastOneCenterOrShowroom"));
      return;
    }

    // Check if at least one center OR one showroom exists
    const hasValidCenter = validCenters.some(
      (center) => center.type === "center"
    );
    const hasValidShowroom = validCenters.some(
      (center) => center.type === "show_room"
    );

    if (!hasValidCenter && !hasValidShowroom) {
      toast.error(t("pleaseAddAtLeastOneCenterOrShowroom"));
      return;
    }

    const payload: UpdateAgentPayload = {
      name: {
        ar: arName,
        en: enName,
      },
      is_active: "1", // Changed from boolean to string
      link: emailLink,
      brand_id: selectedBrandId ? Number(selectedBrandId) : undefined,
      centers: validCenters.length > 0 ? validCenters : undefined,
    };

    updateAgentMutation.mutate(payload);
  };

  if (isLoadingAgent) {
    return (
      <div className="flex justify-center items-center h-64">
        {t("loading")}
      </div>
    );
  }
  return (
    <section>
      <div className="pt-0 pb-2 bg-white ">
        <DashboardHeader
          titleAr="تعديل الوكيل"
          titleEn="Edit agent"
          items={[
            { titleAr: "لوحة التحكم", titleEn: "Dashboard", link: "/" },
            { titleAr: "الوكلاء", titleEn: "Agents", link: "/" },
            { titleAr: "تعديل الوكيل", titleEn: "Edit agent", link: "/" },
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

          <div className="relative w-full">
            <label className="block text-sm text-black mb-2">
              {t("brand")}
            </label>
            <select
              className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
        <hr className="my-[11px]" />

        <TabsFilter
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
            titleAr="تحديث"
            titleEn="Update"
            onClick={handleSubmit}
            isLoading={updateAgentMutation.isPending}
          />
        </div>
      </div>
    </section>
  );
};

export default EditAgent;
