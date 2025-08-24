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
import { useQuery } from "@tanstack/react-query";
import { getVehicleClasses, VehicleClass } from "@/api/categories/getCategory";
import { getVehicleTypes, VehicleType } from "@/api/models/carTypes/getCarTypes";

export function CategoriesTable() {
  const { t, i18n } = useTranslation("models");

  const { data: classes } = useQuery<VehicleClass[]>({
    queryKey: ["vehicleClasses"],
    queryFn: () => getVehicleClasses(),
  });

  const { data: types} = useQuery<VehicleType[]>({
    queryKey: ["vehicleTypes"],
    queryFn: () => getVehicleTypes({ pagination: false }),
  });


  const typeMap: Record<number, string> = {};
  (types || []).forEach((type) => {
    typeMap[type.id] = i18n.language === "ar" ? type.name.ar : type.name.en;
  });

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-right">#</TableHead>
          <TableHead className="text-right">{t('categoryName')}</TableHead>
          <TableHead className="text-right">{t('type')}</TableHead>
          <TableHead className="text-right">{t('status')}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {(classes || []).map((item, index) => (
          <TableRow key={item.id} noBackgroundColumns={1}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{i18n.language === "ar" ? item.name.ar : item.name.en}</TableCell>
            <TableCell className="w-full">{typeMap[item.vehicle_type_id] || item.vehicle_type_id}</TableCell>
            <TableCell className="flex gap-[7px] items-center">
              <Switch isSelected={item.is_active} />
              <Link to={`/categories/${item.id}`}>
                <Edit />
              </Link>
              <div className="mt-2">
                <TableDeleteButton handleDelete={() => console.log("delete", item.id)} />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
