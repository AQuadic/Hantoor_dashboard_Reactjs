import AddMaintenanceCenter from "@/components/agents/AddMaintenanceCenter";
import AddSalesShowrooms from "@/components/agents/AddSalesShowrooms";
import DashboardHeader from "@/components/general/dashboard/DashboardHeader";
import DashboardInput from "@/components/general/DashboardInput";
import TabsFilter from "@/components/general/dashboard/TabsFilter";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useMutation, useQueryClient } from "@tanstack/react-query";
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
  const { t } = useTranslation("agents");
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [arName, setArName] = useState("");
  const [enName, setEnName] = useState("");
  const [emailLink, setEmailLink] = useState("");
  const [website, setWebsite] = useState("");
  // brands removed: this form no longer requires selecting a brand
  const [centers, setCenters] = useState<AgentCenter[]>([
    {
      name: { ar: "", en: "" },
      description: { ar: "", en: "" },
      phone: "",
      whatsapp: "",
      type: "center",
      is_active: "1",
    },
    {
      name: { ar: "", en: "" },
      description: { ar: "", en: "" },
      phone: "",
      whatsapp: "",
      type: "show_room",
      is_active: "1",
    },
  ]);
  console.log(centers);

  const createAgentMutation = useMutation({
    mutationFn: createAgent,
    onSuccess: () => {
      toast.success(t("agentCreatedSuccess"));
      queryClient.invalidateQueries({ queryKey: ["agents"] });
      navigate("/agents");
    },
    onError: (error: any) => {
      let errorMessage = t("agentCreationError");

      if (error.response) {
        const data = error.response.data;
        if (data?.message) {
          errorMessage = data.message;
        }
        if (data?.errors) {
          const allErrors = Object.values(data.errors).flat() as string[];
          errorMessage = allErrors.join(" - ");
        }
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

    // Map centers to object with numeric keys for API
    const centersPayload: Record<
      number,
      {
        name: { ar: string; en: string };
        description: { ar: string; en: string };
        phone: string;
        whatsapp: string;
        type: string;
        is_active: string;
        link_google_map?: string;
      }
    > = {};
    validCenters.forEach((center, idx) => {
      centersPayload[idx] = {
        name: {
          ar: center.name.ar.trim(),
          en: center.name.en.trim(),
        },
        description: {
          ar: center.description.ar.trim(),
          en: center.description.en.trim(),
        },
        // phone is required; whatsapp is optional - include when present or send empty string
        phone: center.phone?.trim() || "",
        whatsapp: center.whatsapp?.trim() || "",
        type: center.type,
        is_active: center.is_active ? "1" : "0",
        link_google_map: center.link_google_map?.trim() || "",
      };
    });

    const payload: CreateAgentPayload = {
      name: {
        ar: trimmedArName,
        en: trimmedEnName,
      },
      is_active: "1", // Always send as string "1"
      link: emailLink.trim(),
      website: website.trim(),
      // brand_id intentionally omitted (brand removed from UI)
      // centersPayload uses numeric-string type codes ("1" | "2"); cast to match CreateAgentPayload
      centers: centersPayload as unknown as CreateAgentPayload["centers"],
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
              label={t("website")}
              value={website}
              onChange={setWebsite}
              placeholder="https://example.com"
            />
          </div>

          <div className="relative w-full">{/* brand selection removed */}</div>
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
