import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import TableDeleteButton from "../general/dashboard/table/TableDeleteButton";
import Edit from "../icons/general/Edit";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "../ui/table";
import { Switch } from "@heroui/react";

const FinancingTable = () => {
  const navigate = useNavigate();

  const technicalsupport = [
    {
        id: 1,
        country: "الامارات",
        count: 22,
    },
    {
        id: 2,
        country: "مصر",
        count: 22,
    },
    {
        id: 3,
        country: "الامارات",
        count: 22,
    },
    ];
    return (
        <Table>
        <TableHeader>
            <TableRow>
            <TableHead className="text-right">#</TableHead>
            <TableHead className="text-right">البلد</TableHead>
            <TableHead className="text-right">عدد البنوك</TableHead>
            <TableHead className="text-right">الحالة</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {technicalsupport.map((question, index) => (
            <TableRow
                key={question.id}
                onClick={() => navigate(`/financing/details/${question.id}`, { state: { country: question.country } })}
                className="cursor-pointer hover:bg-gray-100"
            >
                <TableCell>{index + 1}</TableCell>
                <TableCell>{question.country}</TableCell>
                <TableCell>{question.count}</TableCell>
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

export default FinancingTable
