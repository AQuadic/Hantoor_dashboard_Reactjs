import AgentPageHeader from '@/components/agents/AgentPageHeader'
import AgentPageTable from '@/components/agents/AgentPageTable'
import TablePagination from '@/components/general/dashboard/table/TablePagination'
import React from 'react'

const AgentPage = () => {
    return (
        <div>
            <AgentPageHeader />
            <div className="px-2 md:px-8">
            <AgentPageTable />
            <TablePagination
                currentPage={1}
                setCurrentPage={function (): void {
                    throw new Error("Function not implemented.");
                }}
                totalPages={50}
                totalItems={50}
                itemsPerPage={10}
            />
            </div>
        </div>
    )
}

export default AgentPage
