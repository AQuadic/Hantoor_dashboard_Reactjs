import Location from "../icons/agents/Location";
import { Agent } from "@/api/agents/getAgentById";
import { useTranslation } from "react-i18next";
import NoData from "../general/NoData";

interface Props {
  agent: Agent | null;
}

const SalesShowroomsTable: React.FC<Props> = ({ agent }) => {
  const { i18n } = useTranslation();

  if (!agent) {
    return <p className="mt-6 text-gray-500">Loading agent details...</p>;
  }

  const showrooms =
    agent.service_centers?.filter((center) => center.type === "showroom") ?? [];

  if (showrooms.length === 0) {
    return (
      <NoData />
    );
  }

  return (
    <section className="mt-6 space-y-4">
      {showrooms.map((showroom) => (
        <div
          key={showroom.id}
          className="w-full h-[76px] bg-[#FFFFFF] border border-[#DEDEDE] rounded-[13px]"
        >
          <div className="py-3 px-5 flex items-center justify-between">
            <div>
              <h1 className="text-[#2A32F8] text-[17px] font-bold">
                {showroom.name?.[i18n.language as "ar" | "en"] ?? ""}
              </h1>
              <p className="text-[#03040A] text-sm mt-1">
                {showroom.description?.[i18n.language as "ar" | "en"] ?? ""}
              </p>
            </div>

            <div className="flex items-center gap-4">
                <Location />
                <img src="/images/whatsapp.svg" />
                <img src="/images/phone.svg" />
              </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default SalesShowroomsTable;