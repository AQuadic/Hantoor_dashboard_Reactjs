import FeaturesHeader from "@/components/features/FeaturesHeader"
import FeaturesTable from "@/components/features/FeaturesTable"
import TablePagination from "@/components/general/dashboard/table/TablePagination";

const FeaturesPage = () => {
    return (
        <div className="md:px-8 px-2">
            <FeaturesHeader />
            <FeaturesTable />
            <TablePagination
                currentPage={0}
                setCurrentPage={function (): void {
                    throw new Error("Function not implemented.");
                }}
                totalPages={10}
                totalItems={10}
                itemsPerPage={5}
                />
        </div>
    )
}

export default FeaturesPage
