import { Link } from "react-router";
import TableDeleteButton from "../general/dashboard/table/TableDeleteButton";
import ActiveStatus from "../icons/general/ActiveStatus";
import Edit from "../icons/general/Edit";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "../ui/table";

const TechnicalSupportTable = () => {
    const technicalsupport = [
    {
        id: 1,
        question: "مشكلة في عرض السيارات أو البيانات",
        country: "الامارات",
        count: 22,
        date: "22/03/2024- 08:30 PM"
    },
    {
        id: 2,
        question: "مشكلة في عرض السيارات أو البيانات",
        country: "الامارات",
        count: 22,
        date: "22/03/2024- 08:30 PM"
    },
    {
        id: 3,
        question: "مشكلة في عرض السيارات أو البيانات",
        country: "الامارات",
        count: 22,
        date: "22/03/2024- 08:30 PM"
    },
    ];
    return (
        <Table>
        <TableHeader>
            <TableRow>
            <TableHead className="text-right">#</TableHead>
            <TableHead className="text-right">السؤال</TableHead>
            <TableHead className="text-right">البلد</TableHead>
            <TableHead className="text-right">عدد الرسائل</TableHead>
            <TableHead className="text-right">تاريخ ووقت الانشاء</TableHead>
            <TableHead className="text-right">الحالة</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {technicalsupport.map((question, index) => (
            <TableRow key={question.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{question.question}</TableCell>
                <TableCell>{question.country}</TableCell>
                <TableCell className="">{question.count}</TableCell>
                <TableCell className="">{question.date}</TableCell>
                <TableCell className="flex gap-[7px] items-center">
                <ActiveStatus />
                <Link to="/technical-support/1">
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

export default TechnicalSupportTable
