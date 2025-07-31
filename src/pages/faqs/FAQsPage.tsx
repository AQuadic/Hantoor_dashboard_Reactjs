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
                    totalPages={10}
                    totalItems={10}
                    itemsPerPage={2}
                    />
            </div>
        </div>
    )
}

export default FAQsPage
