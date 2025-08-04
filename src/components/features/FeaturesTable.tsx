import { Link } from "react-router";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import Edit from "../icons/general/Edit";
import TableDeleteButton from "../general/dashboard/table/TableDeleteButton";
import { Switch } from "@heroui/react";
import feature1 from '/images/features/feature1.svg'
import feature2 from '/images/features/feature2.svg'
import feature3 from '/images/features/feature3.svg'
import feature4 from '/images/features/feature4.svg'

const FeaturesTable = () => {
    const profile = [
    {
        id: 1,
        image: feature1,
        text:'تصفح السيارات الجديدة من مكانك',
    },
    {
        id: 2,
        image: feature2,
        text:'اختيار السيارات حسب ميزانيتك',
    },
    {
        id: 3,
        image: feature3,
        text:'التواصل المباشر مع الوكلاء',
    },
    {
        id: 4,
        image: feature4,
        text:'أسعار باقات صيانة الأنسب لسيارتك',
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
            <TableRow key={profie.id} noBackgroundColumns={1}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                    <img src={profie.image} className="w-[52.36px] h-[51px] rounded-[7px]" alt="feature" />
                </TableCell>
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
