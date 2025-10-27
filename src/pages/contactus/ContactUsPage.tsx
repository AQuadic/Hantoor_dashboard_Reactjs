import { useState, useEffect } from "react";
import ContactUsHeader from "@/components/contactus/ContactUsHeader";
import ContactUsTable from "@/components/contactus/ContactUsTable";
import TablePagination from "@/components/general/dashboard/table/TablePagination";
import { useDatePicker } from "@/hooks/useDatePicker";

const ContactUsPage = () => {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [search, setSearch] = useState("");
  const { dateRange, setDateRange, dateParams } = useDatePicker();

  // Reset page to 1 when search term changes
  useEffect(() => {
    if (search) {
      setPage(1);
    }
  }, [search]);

  return (
    <div>
      <ContactUsHeader
        search={search}
        setSearch={setSearch}
        dateRange={dateRange}
        setDateRange={setDateRange}
      />
      <div className="px-2 md:px-8">
        <ContactUsTable
          page={page}
          perPage={perPage}
          search={search}
          dateParams={dateParams}
          setTotalPages={setTotalPages}
          setPerPage={setPerPage}
          setTotalItems={setTotalItems}
        />

        {totalItems > 0 && (
          <div className="mt-4">
            <TablePagination
              currentPage={page}
              setCurrentPage={setPage}
              totalPages={totalPages}
              totalItems={totalItems}
              itemsPerPage={perPage}
              from={(page - 1) * perPage + 1}
              to={Math.min(page * perPage, totalItems)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactUsPage;
