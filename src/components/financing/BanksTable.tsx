import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import TableDeleteButton from "../general/dashboard/table/TableDeleteButton";
import Edit from "../icons/general/Edit";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Switch } from "@heroui/react";
import { useTranslation } from "react-i18next";
import { getBanks } from "@/api/bank/getBanks";
import Loading from "../general/Loading";
import NoData from "../general/NoData";
import { deleteBank } from "@/api/bank/deleteBank";
import toast from "react-hot-toast";

interface BanksTableProps {
  countryId?: string | number;
}

const BanksTable = ({ countryId }: BanksTableProps) => {
  const { t, i18n } = useTranslation("financing");

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["banks", countryId],
    queryFn: ({ queryKey }) => {
      const [, id] = queryKey;
      return getBanks({ country_id: Number(id), pagination: false });
    },
    enabled: !!countryId,
  });

  const handleDelete = async (id: number) => {
    await deleteBank(id);
    toast.success(t("bankDeleted"));
    refetch();
  };

  if (isLoading) return <Loading />;
  if (!data || !Array.isArray(data) || !data.length) return <NoData />;

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
        {data.map((bank, index) => (
          <TableRow key={bank.id} noBackgroundColumns={1}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>
              {bank.image?.url ? (
                <>
                  {/* render image object url - small preview in table */}
                  <img
                    src={bank.image.url}
                    alt={bank.name?.[i18n.language] || "bank-image"}
                    className="w-10 h-10 object-contain rounded"
                  />
                </>
              ) : (
                "-"
              )}
            </TableCell>
            <TableCell>{bank.name?.[i18n.language] || "-"}</TableCell>
            <TableCell className="w-full">
              {bank.citizens?.[0]?.value || bank.expatriates?.[0]?.value || "-"}
            </TableCell>
            <TableCell className="flex gap-[7px] items-center">
              <Switch defaultSelected={Boolean(bank.is_active)} />
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
  );
};

export default BanksTable;
