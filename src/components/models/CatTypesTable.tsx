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

import { getVehicleTypes, VehicleType, GetVehicleTypesPaginated } from "@/api/models/carTypes/getCarTypes";
import { useVehicleBodies, VehicleBody } from "@/api/models/structureType/getStructure";
import { deleteCarType } from "@/api/models/carTypes/deleteCarType";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { updateCarType } from "@/api/models/carTypes/editCarType";

interface CarTypesTableProps {
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

export function CarTypesTable({ search, page, setPagination }: CarTypesTableProps) {
  const { t, i18n } = useTranslation("models");
  const queryClient = useQueryClient();

  const { data: carTypesResponse, isLoading: isLoadingTypes, error: errorTypes } = useQuery<GetVehicleTypesPaginated | VehicleType[], Error>({
    queryKey: ["vehicleTypes", search, page],
    queryFn: () => getVehicleTypes({ 
      pagination: true, 
      search,
      page
    }),
  });

  const { data: bodyTypesResponse, isLoading: isLoadingBodies, error: errorBodies } = useVehicleBodies();

  const isLoading = isLoadingTypes || isLoadingBodies;
  const error = errorTypes || errorBodies;

  useEffect(() => {
    if (carTypesResponse) {
      if (!Array.isArray(carTypesResponse) && 'current_page' in carTypesResponse) {
        setPagination({
          totalPages: carTypesResponse.last_page,
          totalItems: carTypesResponse.total,
          itemsPerPage: carTypesResponse.per_page,
          from: carTypesResponse.from,
          to: carTypesResponse.to,
        });
      } else {
        const dataArray = Array.isArray(carTypesResponse) ? carTypesResponse : [];
        setPagination({
          totalPages: 1,
          totalItems: dataArray.length,
          itemsPerPage: dataArray.length,
          from: dataArray.length > 0 ? 1 : 0,
          to: dataArray.length,
        });
      }
    }
  }, [carTypesResponse, setPagination]);

  if (isLoading) return <Loading />;
  if (error) return <div>{t("error")}: {error.message}</div>;

  const getBodyTypeName = (id: number | string) => {
    const bodies = Array.isArray(bodyTypesResponse) ? bodyTypesResponse : bodyTypesResponse?.data;
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
      queryClient.invalidateQueries({
        queryKey: ["vehicleTypes"]
      });
    };

  const handleToggleStatus = async (car: VehicleType) => {
    try {
      await updateCarType(car.id, {
        is_active: !car.is_active,
      });
      toast.success(!car.is_active ? t("carTypeActivated") : t("carTypeDeactivated"));
      queryClient.invalidateQueries({
        queryKey: ["vehicleTypes"],
      });
    } catch (error) {
      console.error(error);
      toast.error(t("somethingWentWrong"));
    }
    };

  const carTypes = Array.isArray(carTypesResponse)
    ? carTypesResponse 
    : carTypesResponse?.data || [];

  const from = !Array.isArray(carTypesResponse) && carTypesResponse?.from 
    ? carTypesResponse.from 
    : ((page - 1) * 10) + 1;

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
        {carTypes.map((car, index) => (
          <TableRow key={car.id} noBackgroundColumns={1}>
            <TableCell>{from + index}</TableCell>
            <TableCell>{getTypeName(car)}</TableCell>
            <TableCell className="w-full">{getBodyTypeName(car.body_type_id)}</TableCell>
            <TableCell className="flex gap-[7px] items-center">
              <Switch
                isSelected={car.is_active}
                onChange={() => handleToggleStatus(car)}
              />
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