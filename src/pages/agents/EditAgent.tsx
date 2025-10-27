import AddMaintenanceCenter from "@/components/agents/AddMaintenanceCenter";
import AddSalesShowrooms from "@/components/agents/AddSalesShowrooms";
import DashboardHeader from "@/components/general/dashboard/DashboardHeader";
import TabsFilter from "@/components/general/dashboard/TabsFilter";
import DashboardInput from "@/components/general/DashboardInput";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// Brands removed from agent edit form
import {
  fetchAgentById,
  updateAgent,
  UpdateAgentPayload,
  AgentCenter,
  Agent,
} from "@/api/agents/fetchAgents";
import DashboardButton from "@/components/general/dashboard/DashboardButton";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
// DropdownArrow removed when brand select was removed

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
  // brand selection removed
  const [centers, setCenters] = useState<AgentCenter[]>([]);

  // brands query removed

  const { data: agent, isLoading: isLoadingAgent } = useQuery<Agent>({
    queryKey: ["agent", id],
    queryFn: () => fetchAgentById(Number(id)),
    enabled: !!id,
  });

  useEffect(() => {
    if (agent) {
      setArName(agent.name.ar);
      setEnName(agent.name.en);
      // Prefer top-level website when available, otherwise fall back to link
      setEmailLink(agent?.website || agent.link || "");
      // brand omitted from edit form

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

      if (typeof error === "object" && error !== null && "response" in error) {
        const axiosError = error as {
          response?: {
            data?: { message?: string; error?: string };
          };
          message?: string;
        };

        errorMessage =
          axiosError.response?.data?.message ||
          axiosError.response?.data?.error ||
          axiosError.message ||
          errorMessage;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      toast.error(errorMessage);
    },
  });

  const handleSubmit = () => {
    // Trim and validate basic agent info
    const trimmedArName = arName.trim();
    const trimmedEnName = enName.trim();

    if (!trimmedArName || !trimmedEnName) {
      toast.error(t("pleaseFillAllFields"));
      return;
    }

    // Helper function to check if a string has meaningful content (not just whitespace)
    const hasContent = (str: string | undefined): boolean => {
      return !!str && str.trim().length > 0;
    };

    // Separate centers into different categories for better validation
    const allCenters = centers.filter((c) => c.type === "center");
    const allShowrooms = centers.filter((c) => c.type === "show_room");

    // Check if any center/showroom has partial data (some fields filled, some not)
    const hasPartialData = (center: AgentCenter): boolean => {
      const nameAr = hasContent(center.name?.ar);
      const nameEn = hasContent(center.name?.en);
      const descAr = hasContent(center.description?.ar);
      const descEn = hasContent(center.description?.en);

      const filledFields = [nameAr, nameEn, descAr, descEn].filter(Boolean).length;
      return filledFields > 0 && filledFields < 4;
    };

    // Check if any center/showroom is completely empty
    const isEmpty = (center: AgentCenter): boolean => {
      return (
        !hasContent(center.name?.ar) &&
        !hasContent(center.name?.en) &&
        !hasContent(center.description?.ar) &&
        !hasContent(center.description?.en) &&
        !hasContent(center.phone)
      );
    };

    // Check if any center/showroom is complete
    const isComplete = (center: AgentCenter): boolean => {
      return (
        hasContent(center.name?.ar) &&
        hasContent(center.name?.en) &&
        hasContent(center.description?.ar) &&
        hasContent(center.description?.en)
      );
    };

    // Validate centers and showrooms
    const incompleteCenters = [...allCenters, ...allShowrooms].filter(
      (c) => !isEmpty(c) && hasPartialData(c)
    );

    if (incompleteCenters.length > 0) {
      // Check what specific fields are missing
      const missingNames = incompleteCenters.some(
        (c) => !hasContent(c.name?.ar) || !hasContent(c.name?.en)
      );
      const missingDescriptions = incompleteCenters.some(
        (c) => !hasContent(c.description?.ar) || !hasContent(c.description?.en)
      );
      // const missingPhones = incompleteCenters.some((c) => !hasContent(c.phone));

      if (missingNames) {
        toast.error(t("centerIncompleteName"));
      } else if (missingDescriptions) {
        toast.error(t("centerIncompleteDescription"));
      // } else if (missingPhones) {
      //   toast.error(t("centerMissingPhone"));
      } else {
        toast.error(t("centerIncompleteData"));
      }
      return;
    }

    // Filter out completely empty centers/showrooms and keep only complete ones
    const validCenters = [...allCenters, ...allShowrooms].filter(isComplete);

    // Check if we have at least one complete center OR showroom
    const validCentersList = validCenters.filter((c) => c.type === "center");
    const validShowroomsList = validCenters.filter(
      (c) => c.type === "show_room"
    );

    if (validCentersList.length === 0 && validShowroomsList.length === 0) {
      toast.error(t("noCentersOrShowrooms"));
      return;
    }

    const hasChanges =
      trimmedArName !== agent?.name.ar ||
      trimmedEnName !== agent?.name.en ||
      emailLink.trim() !== (agent?.website || agent?.link || "") ||
      JSON.stringify(validCenters) !== JSON.stringify(agent?.centers || []);

    if (!hasChanges) {
      toast.success(t("agentUpdatedSuccess"));
      navigate("/agents");
      return;
    }

    const payload: UpdateAgentPayload = {
      name: {
        ar: trimmedArName,
        en: trimmedEnName,
      },
      is_active: "1", // Changed from boolean to string
      link: emailLink.trim(),
      // brand_id intentionally omitted (brand removed from UI)
      centers:
        validCenters.length > 0
          ? validCenters.map((c) => ({
              // ensure optional phone/whatsapp fields default to empty string when undefined
              ...c,
              name: {
                ar: c.name.ar.trim(),
                en: c.name.en.trim(),
              },
              description: {
                ar: c.description.ar.trim(),
                en: c.description.en.trim(),
              },
              phone: c.phone?.trim() || "",
              whatsapp: c.whatsapp?.trim() || "",
              is_active: c.is_active ?? "1",
              link_google_map: c.link_google_map?.trim() || "",
            }))
          : undefined,
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

          <div className="relative w-full">{/* brand selection removed */}</div>
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
