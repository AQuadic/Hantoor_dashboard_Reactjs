import { Link } from "react-router-dom";
import TableDeleteButton from "../general/dashboard/table/TableDeleteButton";
import Edit from "../icons/general/Edit";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "../ui/table";
import { useTranslation } from "react-i18next";
import { Switch } from "@heroui/react";
import { FinancingRequest } from "@/api/financing/fetchFinancing";
import Loading from "../general/Loading";
import NoData from "../general/NoData";

interface BanksTableProps {
  data: FinancingRequest[];
  isLoading: boolean;
  error: Error | null;
}

const BanksTable = ({ data, isLoading, error }: BanksTableProps) => {
  const { t } = useTranslation("financing");

  if (isLoading) {
    return (
      <Loading />
    );
  }

  if (!data || data.length === 0) {
    return (
      <NoData />
    );
  }

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
            {data.map((bank, index) => (
            <TableRow key={bank.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{bank.user_id}</TableCell>
                <TableCell>{bank.amount}</TableCell>
                <TableCell>{bank.status}</TableCell>
                <TableCell className="flex gap-[7px] items-center">
                <Switch defaultSelected={bank.status === "active"} />
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
