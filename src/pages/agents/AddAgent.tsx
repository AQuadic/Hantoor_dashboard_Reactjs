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

    // brand selection removed; no validation required for brand

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
      }
    > = {};
    validCenters.forEach((center, idx) => {
      // Map local type (center | show_room) to backend numeric codes: "1" = center, "2" = show_room
      const typeCode = center.type === "center" ? "1" : "2";
      centersPayload[idx] = {
        name: {
          ar: center.name.ar,
          en: center.name.en,
        },
        description: {
          ar: center.description.ar,
          en: center.description.en,
        },
        phone: center.phone,
        whatsapp: center.whatsapp,
        type: typeCode,
        is_active: center.is_active ? "1" : "0",
      };
    });

    const payload: CreateAgentPayload = {
      name: {
        ar: arName,
        en: enName,
      },
      is_active: "1", // Always send as string "1"
      link: emailLink,
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
