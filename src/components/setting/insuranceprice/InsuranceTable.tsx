import { Link } from "react-router";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import TableDeleteButton from "@/components/general/dashboard/table/TableDeleteButton";
import Edit from "@/components/icons/general/Edit";
import { useTranslation } from "react-i18next";
import { Switch } from "@heroui/react";

const InsuranceTable = () => {
    const { t } = useTranslation("setting");
    const countries = [
    {
        id: 1,
        Whatsapp: "+971 123 456 789",
        country: "الامارات"
    },
    {
        id: 2,
        Whatsapp: "+971 123 456 789",
        country: "الامارات"
    },
    {
        id: 3,
        Whatsapp: "+971 123 456 789",
        country: "الامارات"
    },
    ];
    return (
        <Table>
        <TableHeader>
            <TableRow>
            <TableHead className="text-right">#</TableHead>
            <TableHead className="text-right">{t('whatsappNumber')}</TableHead>
            <TableHead className="text-right">{t('country')}</TableHead>
            <TableHead className="text-right">{t('status')}</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {countries.map((country, index) => (
            <TableRow key={country.id} noBackgroundColumns={1}>
                <TableCell>{index + 1}</TableCell>
                <TableCell dir="ltr">{country.Whatsapp}</TableCell>
                <TableCell className="w-full">{country.country}</TableCell>
                <TableCell className="flex gap-[7px] items-center">
                <Switch />
                <Link to="/setting/edit-whatsapp/:id">
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

export default InsuranceTable
