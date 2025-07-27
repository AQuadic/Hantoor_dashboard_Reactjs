import TablePagination from "@/components/general/dashboard/table/TablePagination";
import SupportMessagesHeader from "@/components/supportmessages/SupportMessagesHeader"
import SupportMessagesTable from "@/components/supportmessages/SupportMessagesTable"

const SupportMessagesPage = () => {
    return (
        <div>
            <SupportMessagesHeader />
            <div className="px-2 md:px-8">
                <SupportMessagesTable />
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

export default SupportMessagesPage
