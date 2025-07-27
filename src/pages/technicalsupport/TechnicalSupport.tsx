import TablePagination from '@/components/general/dashboard/table/TablePagination'
import TechnicalsupportHeader from '@/components/technicalsupport/TechnicalsupportHeader'
import TechnicalSupportTable from '@/components/technicalsupport/TechnicalSupportTable'
import React from 'react'

const TechnicalSupport = () => {
    return (
        <div>
            <TechnicalsupportHeader />
            <div className="px-2 md:px-8">
                <TechnicalSupportTable />
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

export default TechnicalSupport
