import { Link } from "react-router";
import TableDeleteButton from "../general/dashboard/table/TableDeleteButton";
import ActiveStatus from "../icons/general/ActiveStatus";
import Edit from "../icons/general/Edit";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "../ui/table";

const AgentPageTable = () => {
    const agents = [
    {
        id: 1,
        name:"الشركة الدولية التجارية",
        country: "الامارات",
        count: 22,
        date: "22/03/2024- 08:30 PM"
    },
    {
        id: 2,
        name:"الشركة الدولية التجارية",
        country: "الامارات",
        count: 22,
        date: "22/03/2024- 08:30 PM"
    },
    {
        id: 3,
        name:"الشركة الدولية التجارية",
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
            <TableHead className="text-right">اسم الوكيل</TableHead>
            <TableHead className="text-right">عدد عناوين مراكز الصيانه</TableHead>
            <TableHead className="text-right">عدد عناوين معارض البيع</TableHead>
            <TableHead className="text-right">الحالة</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {agents.map((agent, index) => (
            <TableRow key={agent.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{agent.name}</TableCell>
                <TableCell className="">{agent.count}</TableCell>
                <TableCell className="">{agent.count}</TableCell>
                <TableCell className="flex gap-[7px] items-center">
                <ActiveStatus />
                <Link to="/agent/edit/:id">
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
