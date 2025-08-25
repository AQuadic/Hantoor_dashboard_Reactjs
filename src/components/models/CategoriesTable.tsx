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
import { getVehicleClasses, VehicleClass, GetVehicleClassesPaginated } from "@/api/categories/getCategory";
import { getVehicleTypes, VehicleType, GetVehicleTypesResponse as GetVehicleTypesResponseAPI } from "@/api/models/carTypes/getCarTypes";
import { deleteCategory } from "@/api/categories/deleteCategory";
import toast from "react-hot-toast";
import { useEffect } from "react";

interface CategoriesTableProps {
  search?: string;
  page: number;
  setPagination: (meta: {
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    from: number;
    to: number;
  }) => void;
}

export function CategoriesTable({ search, page, setPagination }: CategoriesTableProps) {
  const { t, i18n } = useTranslation("models");

  const { data: classesResponse, refetch } = useQuery<GetVehicleClassesPaginated | VehicleClass[]>({
    queryKey: ["vehicleClasses", search, page],
    queryFn: () => getVehicleClasses({
      search,
      pagination: true,
      page
    }),
  });

  const { data: types = [] } = useQuery<GetVehicleTypesResponseAPI, Error, VehicleType[]>({
    queryKey: ["vehicleTypes"],
    queryFn: () => getVehicleTypes({ pagination: false }),
    select: (response) => (Array.isArray(response) ? response : response.data || []),
  });

  useEffect(() => {
    if (classesResponse) {
      if (!Array.isArray(classesResponse) && 'current_page' in classesResponse) {
        setPagination({
          totalPages: classesResponse.last_page,
          totalItems: classesResponse.total,
          itemsPerPage: classesResponse.per_page,
          from: classesResponse.from,
          to: classesResponse.to,
        });
      } else {
        const dataArray = Array.isArray(classesResponse) ? classesResponse : [];
        setPagination({
          totalPages: 1,
          totalItems: dataArray.length,
          itemsPerPage: dataArray.length,
          from: dataArray.length > 0 ? 1 : 0,
          to: dataArray.length,
        });
      }
    }
  }, [classesResponse, setPagination]);

  const handleDelete = async (id: number) => {
    await deleteCategory(id);
    toast.success(t("categoryDeleted"));
    refetch();
  };

  const classes = Array.isArray(classesResponse) 
    ? classesResponse 
    : classesResponse?.data || [];

  const typeMap: Record<number, string> = {};
  types.forEach((type: VehicleType) => {
    typeMap[type.id] = i18n.language === "ar" ? type.name.ar : type.name.en;
  });

  const from = !Array.isArray(classesResponse) && classesResponse?.from 
    ? classesResponse.from 
    : ((page - 1) * 10) + 1;

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
        {classes.map((item, index) => (
          <TableRow key={item.id} noBackgroundColumns={1}>
            <TableCell>{from + index}</TableCell>
            <TableCell>{i18n.language === "ar" ? item.name.ar : item.name.en}</TableCell>
            <TableCell className="w-full">{typeMap[item.vehicle_type_id] || item.vehicle_type_id}</TableCell>
            <TableCell className="flex gap-[7px] items-center">
              <Switch isSelected={item.is_active} />
              <Link to={`/categories/${item.id}`}>
                <Edit />
              </Link>
              <div className="mt-2">
                <TableDeleteButton handleDelete={() => handleDelete(item.id)} />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
