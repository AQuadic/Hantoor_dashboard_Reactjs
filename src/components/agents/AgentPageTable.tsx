import { Link, useNavigate } from "react-router-dom";
import TableDeleteButton from "../general/dashboard/table/TableDeleteButton";
import Edit from "../icons/general/Edit";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Switch } from "@heroui/react";

const AgentPageTable = () => {
    const navigate = useNavigate();
    const agents = [
    {
        id: 1,
        name:"الشركة الدولية التجارية",
        country: "الامارات",
        count: 6,
        date: "22/03/2024- 08:30 PM"
    },
    {
        id: 2,
        name:"غبور",
        country: "الامارات",
        count: 8,
        date: "22/03/2024- 08:30 PM"
    },
    {
        id: 3,
        name:"ابو ظبي للسيارات",
        country: "الامارات",
        count: 12,
        date: "22/03/2024- 08:30 PM"
    },
    ];
    return (
        <Table>
        <TableHeader>
            <TableRow>
            <TableHead className="text-right">#</TableHead>
            <TableHead className="text-right">اسم الوكيل</TableHead>
            <TableHead className="text-right">عدد عناوين مراكز الصيانه</TableHead>
            <TableHead className="text-right">عدد عناوين معارض البيع</TableHead>
            <TableHead className="text-right">الحالة</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {agents.map((agent, index) => (
            <TableRow
                key={agent.id}
                onClick={() =>
                navigate(`/agent/details/${agent.id}`, {
                    state: { country: agent.country },
                })
                }
                className="cursor-pointer"
            >
                <TableCell>{index + 1}</TableCell>
                <TableCell>{agent.name}</TableCell>
                <TableCell className="">{agent.count}</TableCell>
                <TableCell className="w-full">{agent.count}</TableCell>
                <TableCell
                    className="flex gap-[7px] items-center"
                    onClick={(e) => e.stopPropagation()}
                >
                <Switch />
                <Link to={`/agent/edit/${agent.id}`}>
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

export default AgentPageTable
