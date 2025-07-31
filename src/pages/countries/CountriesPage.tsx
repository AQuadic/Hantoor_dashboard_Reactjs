import CountriesHeader from "@/components/countries/CountriesHeader"
import CountriesTable from "@/components/countries/CountriesTable"
import TablePagination from "@/components/general/dashboard/table/TablePagination";

const CountriesPage = () => {
    return (
        <div>
            <CountriesHeader />
            <div className="px-2 md:px-8">
                <CountriesTable />
                <TablePagination
                    currentPage={0}
                    setCurrentPage={function (): void {
                        throw new Error("Function not implemented.");
                    }}
                    totalPages={20}
                    totalItems={20}
                    itemsPerPage={5}
                />
            </div>
        </div>
    )
}

export default CountriesPage
