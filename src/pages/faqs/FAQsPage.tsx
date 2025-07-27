import FAQsHeader from "@/components/faqs/FAQsHeader"
import FAQsTable from "@/components/faqs/FAQsTable"
import TablePagination from "@/components/general/dashboard/table/TablePagination";

const FAQsPage = () => {
    return (
        <div>
            <FAQsHeader />
            <div className="px-2 md:px-8">
                <FAQsTable />
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

export default FAQsPage
