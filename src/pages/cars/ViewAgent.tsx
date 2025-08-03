import AgentCard from "@/components/cars/viewCars/agent/AgentCard";
import ViewAgentHeader from "@/components/cars/viewCars/agent/ViewAgentHeader";
import React from "react";

const maintenanceCards = [
  {
    title: "المركز الدولي لصيانة السيارات",
    description: "ش ذياب بن عيسى, مدينة خليفة, أبوظبي",
  },
  {
    title: "المركز الدولي لصيانة السيارات",
    description: "ش ذياب بن عيسى, مدينة خليفة, أبوظبي",
  },
  {
    title: "المركز الدولي لصيانة السيارات",
    description: "ش ذياب بن عيسى, مدينة خليفة, أبوظبي",
  },
];
const showroomsCards = [
  {
    title: "المركز الدولي لصيانة السيارات",
    description: "ش ذياب بن عيسى, مدينة خليفة, أبوظبي",
  },
  {
    title: "المركز الدولي لصيانة السيارات",
    description: "ش ذياب بن عيسى, مدينة خليفة, أبوظبي",
  },
  {
    title: "المركز الدولي لصيانة السيارات",
    description: "ش ذياب بن عيسى, مدينة خليفة, أبوظبي",
  },
];

const ViewAgent = () => {
  const [selectedFilter, setSelectedFilter] = React.useState(
    "Maintenance Centers"
  );
  return (
    <div>
      <ViewAgentHeader
        selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter}
      />
      <div className="px-9  mt-6">
        {selectedFilter === "Maintenance Centers" && (
          <div className="">
            {maintenanceCards.map((card, index) => (
              <AgentCard
                key={index}
                title={card.title}
                description={card.description}
              />
            ))}
          </div>
        )}
        {selectedFilter === "Showrooms" && (
          <div className="">
            {showroomsCards.map((card, index) => (
              <AgentCard
                key={index}
                title={card.title}
                description={card.description}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewAgent;
