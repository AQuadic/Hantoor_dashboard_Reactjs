import AddMaintenanceCenter from "@/components/agents/AddMaintenanceCenter";
import AddSalesShowrooms from "@/components/agents/AddSalesShowrooms";
import DashboardHeader from "@/components/general/dashboard/DashboardHeader";
import TabsFilter from "@/components/general/dashboard/TabsFilter";
import DashboardInput from "@/components/general/DashboardInput";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Brand, BrandsApiResponse, fetchBrands } from "@/api/brand/fetchBrands";
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
  const { t } = useTranslation("agents");
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
      setCenters(agent.centers || []);
    }
  }, [agent]);

  const selectedBrand = brands?.data.find(
    (brand: Brand) => brand.id === Number(selectedBrandId)
  );

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

    const payload: UpdateAgentPayload = {
      name: {
        ar: arName,
        en: enName,
      },
      is_active: true,
      link: emailLink,
      brand_id: selectedBrandId ? Number(selectedBrandId) : undefined,
      centers: centers.length > 0 ? centers : undefined,
    };

    updateAgentMutation.mutate(payload);
  };

  const addCenter = (center: AgentCenter) => {
    setCenters((prev) => [...prev, center]);
  };

  const removeCenter = (index: number) => {
    setCenters((prev) => prev.filter((_, i) => i !== index));
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

          <div className="relative w-full border border-gray-300 rounded-lg p-3 text-sm">
            <p className="text-right text-black text-sm">{t("brand")}</p>
            <div className="flex items-center justify-between gap-1">
              <span className="text-gray-500 text-sm">
                {selectedBrand?.name?.ar || t("selectBrand")}
              </span>

              <select
                className="text-blue-600 bg-transparent focus:outline-none text-sm cursor-pointer"
                value={selectedBrandId}
                onChange={(e) => setSelectedBrandId(e.target.value)}
              >
                <option value="">{t("selectBrand")}</option>
                {brands?.data?.map((brand) => (
                  <option key={brand.id} value={brand.id}>
                    {brand.name.ar}
                  </option>
                ))}
              </select>
            </div>
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
            onAddCenter={addCenter}
            onRemoveCenter={removeCenter}
            centers={centers.filter((c) => c.type === "center")}
            type="center"
          />
        )}

        {selectedFilter === "Add sales Showrooms" && (
          <AddSalesShowrooms
            onAddCenter={addCenter}
            onRemoveCenter={removeCenter}
            centers={centers.filter((c) => c.type === "show_room")}
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
