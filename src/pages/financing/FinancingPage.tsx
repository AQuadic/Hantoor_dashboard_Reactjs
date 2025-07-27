import FinancingHeader from '@/components/financing/FinancingHeader'
import FinancingTable from '@/components/financing/FinancingTable'
import TablePagination from '@/components/general/dashboard/table/TablePagination'
import React from 'react'

const FinancingPage = () => {
    return (
        <div>
            <FinancingHeader />
            <div className="px-2 md:px-8">
                <FinancingTable />
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
        </div>
    )
}

export default FinancingPage
