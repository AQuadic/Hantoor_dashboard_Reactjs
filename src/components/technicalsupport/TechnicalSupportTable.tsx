import { Link } from "react-router";
import TableDeleteButton from "../general/dashboard/table/TableDeleteButton";
import Edit from "../icons/general/Edit";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "../ui/table";
import { Switch } from "@heroui/react";
import { useTranslation } from "react-i18next";

const TechnicalSupportTable = () => {
    const { t } = useTranslation("questions");
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
            <TableHead className="text-right">{t('question')}</TableHead>
            <TableHead className="text-right">{t('country')}</TableHead>
            <TableHead className="text-right">{t('NOMessages')}</TableHead>
            <TableHead className="text-right">{t("dateAndTime")}</TableHead>
            <TableHead className="text-right">{t('status')}</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {technicalsupport.map((question, index) => (
            <TableRow key={question.id} noBackgroundColumns={1}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{question.question}</TableCell>
                <TableCell>{question.country}</TableCell>
                <TableCell className="">{question.count}</TableCell>
                <TableCell className="w-full">{question.date}</TableCell>
                <TableCell className="flex gap-[7px] items-center">
                <Switch />
                <Link to={`/technical-support/edit/${question.id}`}>
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
