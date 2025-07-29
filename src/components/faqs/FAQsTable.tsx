import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import TableDeleteButton from "../general/dashboard/table/TableDeleteButton";
import Edit from "../icons/general/Edit";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "../ui/table";
import { Switch } from "@heroui/react";
const FAQsTable = () => {
  const navigate = useNavigate();

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
            <TableHead className="text-right">عدد مرات الاستفادة</TableHead>
            <TableHead className="text-right">عدد مرات عدم الاستفادة</TableHead>
            <TableHead className="text-right">تاريخ ووقت الانشاء</TableHead>
            <TableHead className="text-right">الحالة</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {technicalsupport.map((question, index) => (
            <TableRow
                key={question.id}
                onClick={() => navigate(`/faq/details/${question.id}`)}
                className="cursor-pointer hover:bg-gray-100"
            >
                <TableCell>{index + 1}</TableCell>
                <TableCell>{question.question}</TableCell>
                <TableCell>{question.country}</TableCell>
                <TableCell>{question.count}</TableCell>
                <TableCell>{question.count}</TableCell>
                <TableCell>{question.date}</TableCell>
                <TableCell
                className="flex gap-[7px] items-center"
                onClick={(e) => e.stopPropagation()} 
                >
                <Switch />
                <Link to={`/faq/edit/${question.id}`}>
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

export default FAQsTable
