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
import { useHasPermission } from "@/hooks/usePermissions";
import Loading from "../general/Loading";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import {
  getVehicleTypes,
  VehicleType,
  GetVehicleTypesPaginated,
} from "@/api/models/carTypes/getCarTypes";
import { fetchBrands } from "@/api/brand/fetchBrands";
import { deleteCarType } from "@/api/models/carTypes/deleteCarType";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { updateCarType } from "@/api/models/carTypes/editCarType";
import NoData from "../general/NoData";

interface CarTypesTableProps {
  readonly search?: string;
  readonly page: number;
  readonly dateParams?: {
    readonly from_date?: string;
    readonly to_date?: string;
  };
  readonly setPagination: (meta: {
    readonly totalPages: number;
    readonly totalItems: number;
    readonly itemsPerPage: number;
    readonly from: number;
    readonly to: number;
  }) => void;
}

export function CarTypesTable({
  search,
  page,
  setPagination,
  dateParams,
}: Readonly<CarTypesTableProps>) {
  const canEdit = useHasPermission("edit_vehicle_type");
  const canChangeStatus = useHasPermission("change-status_vehicle_type");
  const { t, i18n } = useTranslation("models");
  const queryClient = useQueryClient();

  const {
    data: carTypesResponse,
    isLoading: isLoadingTypes,
    error: errorTypes,
  } = useQuery<GetVehicleTypesPaginated | VehicleType[], Error>({
    queryKey: ["vehicleTypes", search, page, dateParams],
    queryFn: () =>
      getVehicleTypes({
        pagination: "normal",
        search,
        page,
        per_page: 15,
        with_brand: 1,
        ...dateParams,
      }),
  });

  const {
    data: brandsResponse,
    isLoading: isLoadingBrands,
    error: errorBrands,
  } = useQuery({
    queryKey: ["brands-list"],
    queryFn: () => fetchBrands(1, "", "", ""),
  });

  const isLoading = isLoadingTypes || isLoadingBrands;
  const error = errorTypes || errorBrands;

  useEffect(() => {
    if (carTypesResponse) {
      if (
        !Array.isArray(carTypesResponse) &&
        "current_page" in carTypesResponse
      ) {
        setPagination({
          totalPages: carTypesResponse.last_page,
          totalItems: carTypesResponse.total,
          itemsPerPage: carTypesResponse.per_page,
          from: carTypesResponse.from,
          to: carTypesResponse.to,
        });
      } else {
        const dataArray = Array.isArray(carTypesResponse)
          ? carTypesResponse
          : [];
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
  if (error)
    return (
      <div>
        {t("error")}: {error.message}
      </div>
    );

  const getBrandName = (car: VehicleType) => {
    // Use brand from API response if available
    if (car.brand) {
      return i18n.language === "ar" ? car.brand.name.ar : car.brand.name.en;
    }
    // Fallback to brands list if brand not included in response
    const brands = brandsResponse?.data || [];
    if (!Array.isArray(brands)) return "-";
    const brand = brands.find((b) => b.id == car.brand_id);
    if (!brand) return "-";
    return i18n.language === "ar" ? brand.name.ar : brand.name.en;
  };

  const getTypeName = (car: VehicleType) => {
    return i18n.language === "ar" ? car.name.ar : car.name.en;
  };

  const handleDelete = async (id: number) => {
    await deleteCarType(id);
    toast.success(t("carTypeDeleted"));
    queryClient.invalidateQueries({
      queryKey: ["vehicleTypes"],
    });
  };

  const handleToggleStatus = async (car: VehicleType) => {
    try {
      await updateCarType(car.id, {
        is_active: !car.is_active,
      });
      toast.success(
        !car.is_active ? t("carTypeActivated") : t("carTypeDeactivated")
      );
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

  const from =
    !Array.isArray(carTypesResponse) && carTypesResponse?.from
      ? carTypesResponse.from
      : (page - 1) * 10 + 1;
  if (!carTypes.length) return <NoData />;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-right">#</TableHead>
          <TableHead className="text-right">{t("type")}</TableHead>
          <TableHead className="text-right">{t("brand")}</TableHead>
          {(canChangeStatus || canEdit) && (
            <TableHead className="text-right">{t("status")}</TableHead>
          )}
        </TableRow>
      </TableHeader>
      <TableBody>
        {carTypes.map((car) => (
          <TableRow key={car.id} noBackgroundColumns={1}>
            <TableCell>{car.id}</TableCell>
            <TableCell>{getTypeName(car)}</TableCell>
            <TableCell className="w-full">{getBrandName(car)}</TableCell>
            {(canChangeStatus || canEdit) && (
              <TableCell className="flex gap-[7px] items-center">
                {canChangeStatus && (
                  <Switch
                    isSelected={car.is_active}
                    onChange={() => handleToggleStatus(car)}
                  />
                )}
                {canEdit && (
                  <Link to={`/car-types/${car.id}`}>
                    <Edit />
                  </Link>
                )}
                <div className="mt-2">
                  <TableDeleteButton
                    handleDelete={() => handleDelete(car.id)}
                  />
                </div>
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
