import AgentPageHeader from '@/components/agents/AgentPageHeader'
import AgentPageTable from '@/components/agents/AgentPageTable'
import TablePagination from '@/components/general/dashboard/table/TablePagination'
import React from 'react'

const AgentPage = () => {
    return (
        <div>
            <AgentPageHeader />
            <AgentPageTable />
            <TablePagination
                currentPage={0}
                setCurrentPage={function (): void {
                    throw new Error("Function not implemented.");
                }}
                totalPages={0}
                totalItems={0}
                itemsPerPage={0}
            />
        </div>
    )
}

export default AgentPage
