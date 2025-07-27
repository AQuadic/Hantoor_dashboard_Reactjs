import ContactUsHeader from "@/components/contactus/ContactUsHeader"
import ContactUsTable from "@/components/contactus/ContactUsTable"
import TablePagination from "@/components/general/dashboard/table/TablePagination";

const ContactUsPage = () => {
    return (
        <div>
            <ContactUsHeader />
            <div className="px-2 md:px-8">
                <ContactUsTable />
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

export default ContactUsPage
