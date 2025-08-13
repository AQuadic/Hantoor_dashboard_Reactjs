// import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import TableDeleteButton from "../general/dashboard/table/TableDeleteButton";
import Edit from "../icons/general/Edit";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "../ui/table";
import { useTranslation } from "react-i18next";
import { Switch } from "@heroui/react";

const BanksTable = () => {
    // const navigate = useNavigate();
    const { t } = useTranslation("financing");

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
            <TableHead className="text-right">{t('image')}</TableHead>
            <TableHead className="text-right">{t('bankNameTitle')}</TableHead>
            <TableHead className="text-right">{t('interestValue')}</TableHead>
            <TableHead className="text-right">{t('status')}</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {bank.map((bank, index) => (
            <TableRow
                key={bank.id}
                noBackgroundColumns={1}
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
                <Switch />
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
