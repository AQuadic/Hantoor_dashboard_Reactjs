import { Link } from "react-router";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import Edit from "../icons/general/Edit";
import TableDeleteButton from "../general/dashboard/table/TableDeleteButton";
import { Switch } from "@heroui/react";

const FeaturesTable = () => {
    const profile = [
    {
        id: 1,
        image: '/',
        text:'ودع الطرق التقليدية في البحث عن السيارات وفر وقتك و جهدك',
    },
    {
        id: 2,
        image: '/',
        text:'ودع الطرق التقليدية في البحث عن السيارات وفر وقتك و جهدك',
    },
    {
        id: 3,
        image: '/',
        text:'ودع الطرق التقليدية في البحث عن السيارات وفر وقتك و جهدك',
    },
    ];
    return (
        <Table>
        <TableHeader>
            <TableRow>
            <TableHead className="text-right">#</TableHead>
            <TableHead className="text-right">الصورة</TableHead>
            <TableHead className="text-right">النص</TableHead>
            <TableHead className="text-right">الحالة</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {profile.map((profie, index) => (
            <TableRow key={profie.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{profie.image}</TableCell>
                <TableCell className="w-full">{profie.text}</TableCell>
                <TableCell className="flex gap-[7px] items-center w-full">
                <Switch />
                <Link to={`/features/edit/${profie.id}`}>
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

export default FeaturesTable
