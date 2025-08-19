import TablePagination from "@/components/general/dashboard/table/TablePagination";
import SupportMessagesHeader from "@/components/supportmessages/SupportMessagesHeader";
import SupportMessagesTable from "@/components/supportmessages/SupportMessagesTable";

const SupportMessagesPage = () => {
  return (
    <div>
      <SupportMessagesHeader />
      <div className="px-2 md:px-8">
        <SupportMessagesTable />
        <TablePagination
          currentPage={1}
          setCurrentPage={function (): void {
            throw new Error("Function not implemented.");
          }}
          totalPages={20}
          totalItems={20}
          itemsPerPage={5}
          from={1}
          to={5}
        />
      </div>
    </div>
  );
};

export default SupportMessagesPage;
