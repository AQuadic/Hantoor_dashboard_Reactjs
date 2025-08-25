import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import CountriesHeader from "@/components/countries/CountriesHeader";
import CountriesTable from "@/components/countries/CountriesTable";
import TablePagination from "@/components/general/dashboard/table/TablePagination";
import { getCountries } from "@/api/countries/getCountry";
import Loading from "@/components/general/Loading";

const CountriesPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; 

  const { data: countriesResponse, isLoading } = useQuery({
    queryKey: ["countries", currentPage, itemsPerPage],
    queryFn: () => getCountries({ page: currentPage, per_page: itemsPerPage }),
  });

  if (isLoading) {
    return (
      <div>
        <CountriesHeader />
        <div className="px-2 md:px-8">
          <Loading />
        </div>
      </div>
    );
  }

  return (
    <div>
      <CountriesHeader />
      <div className="px-2 md:px-8">
        <CountriesTable 
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
        />
        
        {countriesResponse && countriesResponse.data.length > 0 && (
          <TablePagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={countriesResponse.meta.last_page || 1}
            totalItems={countriesResponse.meta.total || countriesResponse.data.length}
            itemsPerPage={itemsPerPage}
            from={countriesResponse.meta.from || 0}
            to={countriesResponse.meta.to || 0}
          />
        )}
      </div>
    </div>
  );
};

export default CountriesPage;
