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

interface PriceFromTableProps {
  search?: string;
}

export function PriceFromTable({ search = "" }: PriceFromTableProps) {
  const { t } = useTranslation("models");
  const pricefrom = [
    {
      id: 1,
      price: "100.000 درهم",
    },
    {
      id: 1,
      price: "200.000 درهم",
    },
    {
      id: 1,
      price: "300.000 درهم",
    },
  ];

  const filtered = pricefrom.filter((item) =>
    item.price.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-right">#</TableHead>
          <TableHead className="text-right">{t("priceFrom")}</TableHead>
          <TableHead className="text-right">{t("status")}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filtered.map((price, index) => (
          <TableRow key={price.id} noBackgroundColumns={1}>
            <TableCell>{index + 1}</TableCell>
            <TableCell className="w-full">{price.price}</TableCell>
            <TableCell className="flex gap-[7px] items-center">
              <Switch />
              <Link to={`/price-from/edit/${price.id}`}>
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
