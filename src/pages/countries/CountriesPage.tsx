import { useState } from "react";
import CountriesHeader from "@/components/countries/CountriesHeader"
import CountriesTable from "@/components/countries/CountriesTable"
import TablePagination from "@/components/general/dashboard/table/TablePagination";

const CountriesPage = () => {
const [currentPage, setCurrentPage] = useState(1);

    return (
        <div>
            <CountriesHeader />
            <div className="px-2 md:px-8">
                <CountriesTable />
                <TablePagination
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    totalPages={20}
                    totalItems={20} 
                    itemsPerPage={5}
                />
            </div>
        </div>
    )
}

export default CountriesPage
