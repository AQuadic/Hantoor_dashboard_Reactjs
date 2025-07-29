import { Link } from "react-router";
import TableDeleteButton from "../general/dashboard/table/TableDeleteButton";
import ActiveStatus from "../icons/general/ActiveStatus";
import Edit from "../icons/general/Edit";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "../ui/table";

const InsuranceTable = () => {
    const countries = [
    {
        id: 1,
        Whatsapp: "+971 123 456 789",
        country: "الامارات"
    },
    {
        id: 2,
        Whatsapp: "+971 123 456 789",
        country: "الامارات"
    },
    {
        id: 3,
        Whatsapp: "+971 123 456 789",
        country: "الامارات"
    },
    ];
    return (
        <Table>
        <TableHeader>
            <TableRow>
            <TableHead className="text-right">#</TableHead>
            <TableHead className="text-right">البلد</TableHead>
            <TableHead className="text-right">رقم الواتساب</TableHead>
            <TableHead className="text-right">الحالة</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {countries.map((country, index) => (
            <TableRow key={country.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{country.Whatsapp}</TableCell>
                <TableCell>{country.country}</TableCell>
                <TableCell className="flex gap-[7px] items-center">
                <ActiveStatus />
                <Link to="/countries/edit">
                    <Edit />
                </Link>

                <div className="mt-2">
                <TableDeleteButton handleDelete={() => {}} />
                </div>
                </TableCell>
            </TableRow>
            ))}
        </TableBody>
        </Table>
    )
}

export default InsuranceTable
