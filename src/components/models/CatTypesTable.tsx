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
import Loading from "../general/Loading";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { getVehicleTypes, VehicleType } from "@/api/models/carTypes/getCarTypes";
import { useVehicleBodies, VehicleBody } from "@/api/models/structureType/getStructure";
import { deleteCarType } from "@/api/models/carTypes/deleteCarType";
import toast from "react-hot-toast";

export function CarTypesTable({ search }: { search?: string }) {
  const { t, i18n } = useTranslation("models");
  const queryClient = useQueryClient();

  const { data: carTypes, isLoading: isLoadingTypes, error: errorTypes } = useQuery<VehicleType[], Error>({
    queryKey: ["vehicleTypes", search],
    queryFn: () => getVehicleTypes({ pagination: false, search }),
  });

  const { data: bodyTypesResponse, isLoading: isLoadingBodies, error: errorBodies } = useVehicleBodies();

  const isLoading = isLoadingTypes || isLoadingBodies;
  const error = errorTypes || errorBodies;

  if (isLoading) return <Loading />;
  if (error) return <div>{t("error")}: {error.message}</div>;

  const getBodyTypeName = (id: number | string) => {
    const bodies = bodyTypesResponse?.data;
    if (!Array.isArray(bodies)) return "-";
    const body = bodies.find((b: VehicleBody) => b.id == id);
    return body ? (i18n.language === "ar" ? body.name.ar : body.name.en) : "-";
  };

  const getTypeName = (car: VehicleType) => {
    return i18n.language === "ar" ? car.name.ar : car.name.en;
  };

    const handleDelete = async (id: number) => {
      await deleteCarType(id);
      toast.success(t("carTypeDeleted"));
      queryClient.setQueryData<VehicleType[]>(["vehicleTypes", search], old =>
        old?.filter(car => car.id !== id)
      );
    };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-right">#</TableHead>
          <TableHead className="text-right">{t('type')}</TableHead>
          <TableHead className="text-right">{t('structure')}</TableHead>
          <TableHead className="text-right">{t('status')}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {carTypes?.map((car, index) => (
          <TableRow key={car.id} noBackgroundColumns={1}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{getTypeName(car)}</TableCell>
            <TableCell className="w-full">{getBodyTypeName(car.body_type_id)}</TableCell>
            <TableCell className="flex gap-[7px] items-center">
              <Switch isSelected={car.is_active} />
              <Link to={`/car-types/${car.id}`}>
                <Edit />
              </Link>
              <div className="mt-2">
                <TableDeleteButton handleDelete={() => handleDelete(car.id)} />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}