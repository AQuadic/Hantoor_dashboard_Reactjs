import { Link } from "react-router";
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

export function PriceToTable() {
  const { t } = useTranslation("models");
  const priceto = [
    {
      id: 1,
      price: "500.000 درهم",
    },
    {
      id: 1,
      price: "600.000 درهم",
    },
    {
      id: 1,
      price: "700.000 درهم",
    },
  ];

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-right">#</TableHead>
          <TableHead className="text-right">{t('priceTo')}</TableHead>
          <TableHead className="text-right">{t('status')}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {priceto.map((price, index) => (
          <TableRow key={price.id} noBackgroundColumns={1}>
            <TableCell>{index + 1}</TableCell>
            <TableCell className="w-full">{price.price}</TableCell>
            <TableCell className="flex gap-[7px] items-center">
              <Switch />
              <Link to={`/price-to/edit/${price.id}`}>
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
  );
}
