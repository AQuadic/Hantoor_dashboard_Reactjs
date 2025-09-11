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
import { getBanks, Bank } from "@/api/bank/getBanks";
import Loading from "../general/Loading";
import NoData from "../general/NoData";
import { deleteBank } from "@/api/bank/deleteBank";
import toast from "react-hot-toast";
import TablePagination from "@/components/general/dashboard/table/TablePagination";
import { useState } from "react";

interface BanksTableProps {
  countryId?: string | number;
}

const BanksTable = ({ countryId }: BanksTableProps) => {
  const { t, i18n } = useTranslation("financing");

  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["banks", countryId, currentPage],
    queryFn: ({ queryKey }) => {
      const [, id] = queryKey;
      return getBanks({
        country_id: Number(id),
        pagination: true,
        page: currentPage,
      });
    },
    enabled: !!countryId,
    placeholderData: (prev) => prev,
  });

  const handleDelete = async (id: number) => {
    await deleteBank(id);
    toast.success(t("bankDeleted"));
    refetch();
  };

  if (isLoading) return <Loading />;

  // Normalize different possible response shapes:
  // - paginated response: { current_page, data: Bank[] , ...meta }
  // - legacy array response: Bank[]
  const banksArray: Bank[] = (() => {
    if (!data) return [];
    if (Array.isArray(data)) return data;
    const resp = data as unknown as Record<string, unknown>;
    if (Array.isArray(resp.data)) return resp.data as Bank[];
    if (resp.data && typeof resp.data === "object") {
      const inner = (resp.data as Record<string, unknown>).data;
      if (Array.isArray(inner)) return inner as Bank[];
    }
    return [];
  })();

  if (!banksArray || banksArray.length === 0) return <NoData />;

  return (
    <>
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
          {banksArray.map((bank: Bank, index: number) => (
            <TableRow key={bank.id} noBackgroundColumns={1}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>
                {(() => {
                  if (!bank.image) return "-";
                  if (typeof bank.image === "string")
                    return (
                      <img
                        src={bank.image}
                        alt={bank.name?.ar || bank.name?.en || "bank-image"}
                        className="w-10 h-10 object-contain rounded"
                      />
                    );
                  const imgObj = bank.image as { url?: string };
                  return (
                    <img
                      src={imgObj.url || ""}
                      alt={bank.name?.ar || bank.name?.en || "bank-image"}
                      className="w-10 h-10 object-contain rounded"
                    />
                  );
                })()}
              </TableCell>
              <TableCell>
                {bank.name?.[i18n.language as "ar" | "en"] ||
                  bank.name?.ar ||
                  bank.name?.en ||
                  "-"}
              </TableCell>
              <TableCell className="w-full">
                {bank.citizens?.[0]?.value ||
                  bank.expatriates?.[0]?.value ||
                  "-"}
              </TableCell>
              <TableCell className="flex gap-[7px] items-center">
                <Switch defaultSelected={Boolean(bank.is_active)} />
                <Link to={`/bank/edit/${bank.id}`}>
                  <Edit />
                </Link>
                <div className="mt-2">
                  <TableDeleteButton
                    handleDelete={() => handleDelete(bank.id)}
                  />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {data &&
        !Array.isArray(data) &&
        // try to extract pagination meta from the response
        (() => {
          const resp = data as unknown as Record<string, unknown>;
          const meta = (resp.meta as Record<string, unknown>) || resp;
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const m: any = meta;
          const current = Number(
            resp["current_page"] ?? m.current_page ?? currentPage
          );
          const last = Number(resp["last_page"] ?? m.last_page ?? 1);
          const total = Number(resp["total"] ?? m.total ?? banksArray.length);
          const perPage = Number(
            resp["per_page"] ?? m.per_page ?? banksArray.length
          );
          const from = Number(resp["from"] ?? m.from ?? 0);
          const to = Number(resp["to"] ?? m.to ?? banksArray.length);
          return (
            <TablePagination
              currentPage={current}
              setCurrentPage={(page: number) => setCurrentPage(page)}
              totalPages={last}
              totalItems={total}
              itemsPerPage={perPage}
              from={from}
              to={to}
            />
          );
        })()}
    </>
  );
};

export default BanksTable;
