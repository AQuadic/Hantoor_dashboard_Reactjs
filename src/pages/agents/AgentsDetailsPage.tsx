import AgentsHeader from '@/components/agents/AgentsHeader'
import React, { useState } from 'react'
import MaintenanceCentersTable from '@/components/agents/MaintenanceCentersTable';
import SalesShowroomsTable from '@/components/agents/SalesShowroomsTable';

const AgentsDetailsPage = () => {
    const [selectedFilter, setSelectedFilter] = useState("Maintenance centers");
    
    return (
        <div>
            <AgentsHeader 
                selectedFilter={selectedFilter}
                setSelectedFilter={setSelectedFilter}
            />
            <div className="px-2 md:px-8 relative min-h-[300px]">
                {selectedFilter === "Maintenance centers" ? (
                    <MaintenanceCentersTable />
                ) : (
                    <SalesShowroomsTable />
                )}
            </div>
        </div>
    )
}

export default AgentsDetailsPage