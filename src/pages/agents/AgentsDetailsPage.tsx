import AgentsHeader from '@/components/agents/AgentsHeader'
import React, { useState } from 'react'
import { AnimatePresence, motion } from "framer-motion";
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
                <AnimatePresence mode="wait">
                {selectedFilter === "Maintenance centers" ? (
                    <motion.div
                    key="Maintenance"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    >
                    <MaintenanceCentersTable />
                    </motion.div>
                ) : (
                    <motion.div
                    key="Sales Showrooms"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    >
                    <SalesShowroomsTable />
                    </motion.div>
                )}
                </AnimatePresence>
            </div>
        </div>
    )
}

export default AgentsDetailsPage
