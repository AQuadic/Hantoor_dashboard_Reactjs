import AgentCard from "@/components/cars/viewCars/agent/AgentCard";
import ViewAgentHeader from "@/components/cars/viewCars/agent/ViewAgentHeader";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Agent, getAgentById } from "@/api/agents/getAgentById";
import { useTranslation } from "react-i18next";

const ViewAgent = () => {
  const { id } = useParams<{ id: string }>();
  const { i18n } = useTranslation();
  const [selectedFilter, setSelectedFilter] = React.useState(
    "Maintenance Centers"
  );
  const [agent, setAgent] = useState<Agent | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchAgent = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getAgentById(Number(id));
        setAgent(data);
      } catch (err) {
        console.error(err);
        const errorMessage =
          err instanceof Error ? err.message : "Failed to fetch agent";
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchAgent();
  }, [id]);

  const isArabic = i18n.language === "ar";

  const maintenanceCenters =
    agent?.service_centers?.filter((center) => center.type === "center") || [];

  const showrooms =
    agent?.service_centers?.filter((center) => center.type === "show_room") ||
    [];

  const getLocalizedDescription = (
    description?: { ar: string; en: string } | null
  ) => {
    if (!description) return "";
    return isArabic ? description.ar : description.en;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (error || !agent) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-lg text-red-500">{error || "Agent not found"}</div>
      </div>
    );
  }

  return (
    <div>
      <ViewAgentHeader
        selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter}
        agent={agent}
      />
      <div className="px-9 mt-6">
        {selectedFilter === "Maintenance Centers" && (
          <div className="">
            {maintenanceCenters.length > 0 ? (
              maintenanceCenters.map((center) => {
                const title = isArabic ? center.name.ar : center.name.en;
                const description = getLocalizedDescription(center.description);
                return (
                  <AgentCard
                    key={center.id}
                    title={title}
                    description={description}
                    phone={center.phone}
                    mapLink={center.link_google_map}
                  />
                );
              })
            ) : (
              <div className="text-center py-8 text-gray-500">
                No maintenance centers available
              </div>
            )}
          </div>
        )}
        {selectedFilter === "Showrooms" && (
          <div className="">
            {showrooms.length > 0 ? (
              showrooms.map((center) => {
                const title = isArabic ? center.name.ar : center.name.en;
                const description = getLocalizedDescription(center.description);
                return (
                  <AgentCard
                    key={center.id}
                    title={title}
                    description={description}
                    phone={center.phone}
                    mapLink={center.link_google_map}
                  />
                );
              })
            ) : (
              <div className="text-center py-8 text-gray-500">
                No showrooms available
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewAgent;
