import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { toast } from "react-hot-toast";
import TableDeleteButton from "../general/dashboard/table/TableDeleteButton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import ChatIcon from "../icons/chats/ChatIcon";
import ConversationPage from "@/pages/chats/ConversationPage";
import { Switch } from "@heroui/react";
import carImage from "/images/cartable.png";
import TableEditButton from "@/components/general/dashboard/table/TableEditButton";
import ViewIcon from "@/components/icons/dashboard/ViewIcon";
import { Link } from "react-router";
import Loading from "@/components/general/Loading";
import {
  fetchVehicles,
  deleteVehicle,
  toggleVehicleStatus,
  type Vehicle,
  type VehicleFilters,
  type VehiclesApiResponse,
} from "@/api/vehicles";

interface CarsTableProps {
  currentPage: number;
  searchTerm?: string;
  filters?: VehicleFilters;
  onDataChange?: (data: VehiclesApiResponse) => void;
}

const CarsTable = ({
  currentPage = 1,
  searchTerm = "",
  filters = {},
  onDataChange,
}: CarsTableProps) => {
  const { t } = useTranslation("cars");
  const queryClient = useQueryClient();
  const [openChatId, setOpenChatId] = useState<number | null>(null);

  // Fetch vehicles with filters
  const { data: vehiclesData, isLoading, error } = useQuery({
    queryKey: ["vehicles", currentPage, searchTerm, filters],
    queryFn: () =>
      fetchVehicles(currentPage, {
        ...filters,
        search: searchTerm,
        per_page: 10,
      }),
  });

  // Handle error
  useEffect(() => {
    if (error) {
      console.error("Error fetching vehicles:", error);
      toast.error(t("errorFetchingVehicles") || "Error fetching vehicles");
    }
  }, [error, t]);

  // Call onDataChange when data changes
  useEffect(() => {
    if (vehiclesData && onDataChange) {
      onDataChange(vehiclesData);
    }
  }, [vehiclesData, onDataChange]);

  // Delete vehicle mutation
  const deleteVehicleMutation = useMutation({
    mutationFn: deleteVehicle,
    onSuccess: () => {
      toast.success(
        t("vehicleDeletedSuccess") || "Vehicle deleted successfully"
      );
      queryClient.invalidateQueries({ queryKey: ["vehicles"] });
    },
    onError: (error: unknown) => {
      let errorMessage = t("vehicleDeleteError") || "Error deleting vehicle";
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (
        typeof error === "object" &&
        error !== null &&
        "response" in error
      ) {
        const responseError = error as {
          response?: { data?: { message?: string } };
        };
        errorMessage = responseError.response?.data?.message || errorMessage;
      }
      toast.error(errorMessage);
    },
  });

  // Toggle status mutation
  const toggleStatusMutation = useMutation({
    mutationFn: ({ id, isActive }: { id: number; isActive: boolean }) =>
      toggleVehicleStatus(id, isActive),
    onSuccess: () => {
      toast.success(t("vehicleStatusUpdated") || "Vehicle status updated");
      queryClient.invalidateQueries({ queryKey: ["vehicles"] });
    },
    onError: (error: unknown) => {
      let errorMessage =
        t("vehicleStatusError") || "Error updating vehicle status";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      toast.error(errorMessage);
    },
  });

  const handleDelete = (id: number) => {
    if (
      window.confirm(
        t("confirmDeleteVehicle") ||
          "Are you sure you want to delete this vehicle?"
      )
    ) {
      deleteVehicleMutation.mutate(id);
    }
  };

  const handleToggleStatus = (vehicle: Vehicle) => {
    // Use status field (0/1) or fallback to is_active field
    const currentStatus =
      vehicle.status !== undefined
        ? vehicle.status === 1
        : vehicle.is_active || false;
    const newStatus = !currentStatus;

    console.log(
      "Toggle status for vehicle:",
      vehicle.id,
      "Current:",
      currentStatus,
      "New:",
      newStatus
    );
    toggleStatusMutation.mutate({ id: vehicle.id, isActive: newStatus });
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("ar-EG", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return dateString;
    }
  };

  const formatPrice = (price: string) => {
    return `${price} ${t("currency") || "درهم"}`;
  };

  const getVehicleImage = (vehicle: Vehicle) => {
    if (vehicle.image && !vehicle.image.startsWith("http")) {
      // Clean double slashes and add base URL if needed
      const cleanPath = vehicle.image.replace(/\/+/g, "/");
      return cleanPath.startsWith("/") ? cleanPath : `/${cleanPath}`;
    }
    return vehicle.image || carImage;
  };

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-8">
        <p className="text-red-500">
          {t("errorFetchingVehicles") || "Error fetching vehicles"}
        </p>
      </div>
    );
  }

  // Debug logging
  console.log("vehiclesData:", vehiclesData);
  if (vehiclesData) {
    console.log("vehiclesData.data:", (vehiclesData as VehiclesApiResponse).data);
    console.log("isArray:", Array.isArray((vehiclesData as VehiclesApiResponse).data));
  }

  // Ensure vehicles is always an array
  const vehicles: Vehicle[] = vehiclesData && Array.isArray((vehiclesData as VehiclesApiResponse).data) 
    ? (vehiclesData as VehiclesApiResponse).data 
    : [];
  
  return (
    <div className="relative flex">
      <div className="w-full">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-right">#</TableHead>
              <TableHead className="text-right">{t("image")}</TableHead>
              <TableHead className="text-right">{t("carName")}</TableHead>
              <TableHead className="text-right">{t("brandName")}</TableHead>
              <TableHead className="text-right">{t("agentName")}</TableHead>
              <TableHead className="text-right">{t("type")}</TableHead>
              <TableHead className="text-right">{t("model")}</TableHead>
              <TableHead className="text-right">{t("price")}</TableHead>
              <TableHead className="text-right">{t("discount")}</TableHead>
              <TableHead className="text-right">
                {t("discountPercentage")}
              </TableHead>
              <TableHead className="text-right">{t("offers")}</TableHead>
              <TableHead className="text-right">
                {t("pricetaxIncluded")}
              </TableHead>
              <TableHead className="text-right">
                {t("pricewarrantyIncluded")}
              </TableHead>
              <TableHead className="text-right">
                {t("priceinsuranceIncluded")}
              </TableHead>
              <TableHead className="text-right">{t("leaseToOwn")}</TableHead>
              <TableHead className="text-right">{t("favTimes")}</TableHead>
              <TableHead className="text-right">{t("dateAndTime")}</TableHead>
              <TableHead className="text-right">{t("status")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {vehicles.map((vehicle, index) => (
              <TableRow key={vehicle.id} noBackgroundColumns={1}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  <img
                    src={getVehicleImage(vehicle)}
                    alt={vehicle.name.en}
                    className="w-[93px] h-[60px] object-cover rounded"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = carImage;
                    }}
                  />
                </TableCell>
                <TableCell>{vehicle.name.ar || vehicle.name.en}</TableCell>
                <TableCell>
                  {vehicle.brand?.name?.ar || vehicle.brand?.name?.en || "-"}
                </TableCell>
                <TableCell>
                  {vehicle.agent?.name?.ar || vehicle.agent?.name?.en || "-"}
                </TableCell>
                <TableCell>-</TableCell>
                <TableCell>{vehicle.vehicle_model?.name?.ar || "-"}</TableCell>
                <TableCell>{formatPrice(vehicle.price)}</TableCell>
                <TableCell>
                  {vehicle.is_discount ? t("yes") || "نعم" : t("no") || "لا"}
                </TableCell>
                <TableCell>
                  {vehicle.is_discount && vehicle.discount_value
                    ? `${vehicle.discount_value}%`
                    : "-"}
                </TableCell>
                <TableCell>
                  {vehicle.offers && vehicle.offers.length > 0
                    ? t("yes") || "نعم"
                    : t("no") || "لا"}
                </TableCell>
                <TableCell>
                  {vehicle.is_include_tax ? t("yes") || "نعم" : t("no") || "لا"}
                </TableCell>
                <TableCell>
                  {vehicle.is_include_warranty
                    ? t("yes") || "نعم"
                    : t("no") || "لا"}
                </TableCell>
                <TableCell>
                  {vehicle.is_Insurance_warranty
                    ? t("yes") || "نعم"
                    : t("no") || "لا"}
                </TableCell>
                <TableCell>
                  {vehicle.is_rent_to_own ? t("yes") || "نعم" : t("no") || "لا"}
                </TableCell>
                <TableCell>{vehicle.views || 0}</TableCell>
                <TableCell>{formatDate(vehicle.created_at)}</TableCell>
                <TableCell className="flex gap-[7px] items-center">
                  <Switch
                    isSelected={
                      vehicle.status !== undefined
                        ? vehicle.status === 1
                        : vehicle.is_active || false
                    }
                    onValueChange={() => handleToggleStatus(vehicle)}
                    size="sm"
                  />
                  <button onClick={() => setOpenChatId(vehicle.id)}>
                    <ChatIcon />
                  </button>
                  <Link to={`/cars/${vehicle.id}`} className="">
                    <ViewIcon />
                  </Link>
                  <Link to={`/cars/edit/${vehicle.id}`} className="mt-2">
                    <TableEditButton />
                  </Link>
                  <div className="mt-2">
                    <TableDeleteButton
                      handleDelete={() => handleDelete(vehicle.id)}
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <AnimatePresence>
        {openChatId !== null && (
          <>
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setOpenChatId(null)}
              className="fixed inset-0 bg-black z-40"
            />

            <motion.div
              key="sidebar"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3 }}
              className="fixed top-0 right-0 h-full md:w-[493px] w-[300px] bg-white shadow-lg z-50 overflow-y-auto"
            >
              <ConversationPage />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CarsTable;
