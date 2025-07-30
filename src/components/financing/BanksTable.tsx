// import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import TableDeleteButton from "../general/dashboard/table/TableDeleteButton";
import ActiveStatus from "../icons/general/ActiveStatus";
import Edit from "../icons/general/Edit";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "../ui/table";

const BanksTable = () => {
    // const navigate = useNavigate();

    const bank = [
    {
        id: 1,
        question: "/",
        country: "الامارات",
        count: 22,
    },
    {
        id: 2,
        question: "/",
        country: "مصر",
        count: 22,
    },
    {
        id: 3,
        question: "/",
        country: "الامارات",
        count: 22,
    },
    ];
    return (
        <Table>
        <TableHeader>
            <TableRow>
            <TableHead className="text-right">#</TableHead>
            <TableHead className="text-right">الصورة</TableHead>
            <TableHead className="text-right">اسم البنك</TableHead>
            <TableHead className="text-right">قيمة الفائدة</TableHead>
            <TableHead className="text-right">الحالة</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {bank.map((bank, index) => (
            <TableRow
                key={bank.id}
                // onClick={() => navigate(`/faq/details/${bank.id}`)}
                // className="cursor-pointer hover:bg-gray-100"
            >
                <TableCell>{index + 1}</TableCell>
                <TableCell>{bank.question}</TableCell>
                <TableCell>{bank.country}</TableCell>
                <TableCell className="w-full">{bank.count}</TableCell>
                <TableCell
                className="flex gap-[7px] items-center"
                // onClick={(e) => e.stopPropagation()} 
                >
                <ActiveStatus />
                <Link to={`/bank/edit/${bank.id}`}>
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

export default BanksTable
