import Location from "../icons/agents/Location";
import { Agent } from "@/api/agents/getAgentById";
import { useTranslation } from "react-i18next";
import NoData from "../general/NoData";

interface Props {
  agent: Agent | null;
}

const MaintenanceCentersTable: React.FC<Props> = ({ agent }) => {
  const { i18n } = useTranslation();
  const lang = i18n.language as "ar" | "en";

  if (!agent) {
    return <p className="mt-6 text-gray-500">Loading agent details...</p>;
  }

  const maintenanceCenters =
    agent.service_centers?.filter((center) => center.type === "1") ?? [];

  if (maintenanceCenters.length === 0) {
    return <NoData />;
  }

  return (
    <section className="mt-6 space-y-4">
      {maintenanceCenters.map((center) => (
        <div
          key={center.id}
          className="w-full h-[76px] bg-[#FFFFFF] border border-[#DEDEDE] rounded-[13px]"
        >
          <div className="py-3 px-5 flex items-center justify-between">
            <div>
              <h1 className="text-[#2A32F8] text-[17px] font-bold">
                {center.name?.[lang] ?? ""}
              </h1>
              <p className="text-[#03040A] text-sm mt-1">
                {center.description?.[lang] ?? ""}
              </p>
            </div>
            <div className="flex items-center gap-4">
              {center.link_google_map && (
                <a
                  href={center.link_google_map}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Location />
                </a>
              )}

              {center.phone && (
                <>
                  <a href={`tel:${center.phone}`}>
                    <img src="/images/phone.svg" alt="Phone" />
                  </a>
                  <a
                    href={`https://wa.me/${center.phone}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src="/images/whatsapp.svg" alt="WhatsApp" />
                  </a>
                </>
              )}
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default MaintenanceCentersTable;