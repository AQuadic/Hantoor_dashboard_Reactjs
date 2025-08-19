import ContactUsHeader from "@/components/contactus/ContactUsHeader";
import ContactUsTable from "@/components/contactus/ContactUsTable";
import TablePagination from "@/components/general/dashboard/table/TablePagination";

const ContactUsPage = () => {
  return (
    <div>
      <ContactUsHeader />
      <div className="px-2 md:px-8">
        <ContactUsTable />
        <TablePagination
          currentPage={1}
          setCurrentPage={function (): void {
            throw new Error("Function not implemented.");
          }}
          totalPages={10}
          totalItems={10}
          itemsPerPage={2}
          from={1}
          to={2}
        />
      </div>
    </div>
  );
};

export default ContactUsPage;
