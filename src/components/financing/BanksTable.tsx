import { Link } from "react-router-dom";
import TableDeleteButton from "../general/dashboard/table/TableDeleteButton";
import Edit from "../icons/general/Edit";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "../ui/table";
import { useTranslation } from "react-i18next";
import { Switch } from "@heroui/react";

interface BanksTableProps {
  countryId?: string | number;
}

const BanksTable = ({ countryId }: BanksTableProps) => {
  const { t } = useTranslation("financing");

  const bank = [
    { id: 1, question: "/", country: "الامارات", country_id: 1, count: 22 },
    { id: 2, question: "/", country: "مصر", country_id: 2, count: 22 },
    { id: 3, question: "/", country: "الامارات", country_id: 1, count: 22 },
  ];

  const filteredBanks = countryId
    ? bank.filter((b) => b.country_id.toString() === countryId.toString())
    : bank;

    return (
        <Table>
        <TableHeader>
            <TableRow>
            <TableHead className="text-right">#</TableHead>
            <TableHead className="text-right">{t("image")}</TableHead>
            <TableHead className="text-right">{t("bankNameTitle")}</TableHead>
            <TableHead className="text-right">{t("interestValue")}</TableHead>
            <TableHead className="text-right">{t("status")}</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {filteredBanks.map((bank, index) => (
            <TableRow key={bank.id} noBackgroundColumns={1}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{bank.question}</TableCell>
                <TableCell>{bank.country}</TableCell>
                <TableCell className="w-full">{bank.count}</TableCell>
                <TableCell className="flex gap-[7px] items-center">
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
