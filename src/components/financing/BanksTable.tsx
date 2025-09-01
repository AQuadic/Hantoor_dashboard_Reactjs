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
import { deleteFinancing } from "@/api/financing/deleteFinancing";
import toast from "react-hot-toast";

interface BanksTableProps {
  data: FinancingRequest[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}

const BanksTable = ({ data, isLoading, refetch }: BanksTableProps) => {
  const { t, i18n } = useTranslation("financing");
    const handleDelete = async (id: number) => {
      await deleteFinancing(id);
      toast.success(t("bankDeleted"));
      refetch();
    };

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
            <TableHead className="text-right w-full">{t('interestValue')}</TableHead>
            <TableHead className="text-right">{t('status')}</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {data.map((bank, index) => (
            <TableRow key={bank.id} noBackgroundColumns={1}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{bank.name ? bank.name[i18n.language as "ar" | "en"] : "-"}</TableCell>
                <TableCell>{bank.amount}</TableCell>
                <TableCell>{bank.status}</TableCell>
                <TableCell className="flex gap-[7px] items-center">
                <Switch defaultSelected={bank.status === "active"} />
                <Link to={`/bank/edit/${bank.id}`}>
                    <Edit />
                </Link>
                <div className="mt-2">
                <TableDeleteButton handleDelete={() => handleDelete(bank.id)} />
                </div>
                </TableCell>
            </TableRow>
            ))}
        </TableBody>
        </Table>
    )
}

export default BanksTable
