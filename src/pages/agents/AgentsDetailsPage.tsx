import AgentsHeader from '@/components/agents/AgentsHeader';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MaintenanceCentersTable from '@/components/agents/MaintenanceCentersTable';
import SalesShowroomsTable from '@/components/agents/SalesShowroomsTable';
import { Agent, getAgentById } from '@/api/agents/getAgentById';

type AgentFilterType = "MaintenanceCenters" | "SalesShowrooms";

const AgentsDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedFilter, setSelectedFilter] = useState<AgentFilterType>("MaintenanceCenters");
  const [agent, setAgent] = useState<Agent | undefined>(undefined);

  useEffect(() => {
    if (!id) return;

    const fetchAgent = async () => {
      try {
        const data = await getAgentById(Number(id));
        setAgent(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAgent();
  }, [id]);

    return (
        <div>
            <AgentsHeader 
                selectedFilter={selectedFilter}
                setSelectedFilter={setSelectedFilter}
                agent={agent}
            />
            <div className="px-2 md:px-8 relative min-h-[300px]">
                {selectedFilter === "MaintenanceCenters" ? (
                <MaintenanceCentersTable agent={agent ?? null} />
                ) : (
                <SalesShowroomsTable agent={agent ?? null} />
                )}
            </div>
        </div>
    )
}

export default AgentsDetailsPage;