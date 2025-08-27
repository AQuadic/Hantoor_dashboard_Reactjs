import { Switch } from "@heroui/react";
import { Link } from "react-router";
import TableDeleteButton from "../general/dashboard/table/TableDeleteButton";
import Edit from "../icons/general/Edit";
import Password from "../icons/general/Password";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import Loading from "../general/Loading";
import { getAdmins } from "@/api/admins/getAdmins";

export function SubordinatesTable() {
  const { t } = useTranslation("subordinates");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["admins"],
    queryFn: () =>
      getAdmins({
        search: "",
        pagination: "simple",
        per_page: 50,
      }),
  });

  if (isLoading) return <Loading />;
  if (isError) return <p>{t("error")}</p>;

  const subordinates = data?.data || [];

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-right">#</TableHead>
          <TableHead className="text-right">{t('image')}</TableHead>
          <TableHead className="text-right">{t('name')}</TableHead>
          <TableHead className="text-right">{t('phoneNumber')}</TableHead>
          <TableHead className="text-right">{t('email')}</TableHead>
          <TableHead className="text-right">{t('dateTime')}</TableHead>
          <TableHead className="text-right">{t('administrativePositions')}</TableHead>
          <TableHead className="text-right">{t('lastLogin')}</TableHead>
          <TableHead className="text-right">{t('status')}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {subordinates.map((subordinate, index: number) => (
          <TableRow key={subordinate.id} noBackgroundColumns={1}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>
              <img
                src={subordinate.image || "/images/admin/admin1.svg"}
                alt="admin"
              />
            </TableCell>
            <TableCell>{subordinate.name}</TableCell>
            <TableCell>{subordinate.mobile || "-"}</TableCell>
            <TableCell>{subordinate.email}</TableCell>
            <TableCell>{subordinate.created_at}</TableCell>
            <TableCell>-</TableCell>
            <TableCell>{subordinate.updated_at}</TableCell>
            <TableCell className="flex gap-[7px] items-center">
              <Switch checked={true} />
              <Link to={`/subordinates/${subordinate.id}`}>
                <Edit />
              </Link>
              <Link to={`/subordinates/change_password/${subordinate.id}`}>
                <Password />
              </Link>
              <div className="mt-2">
                <TableDeleteButton handleDelete={() => {}} />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
