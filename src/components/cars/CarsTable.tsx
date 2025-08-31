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
  getVehicleName,
  type Vehicle,
  type VehicleFilters,
  type VehiclesApiResponse,
  VehicleName,
} from "@/api/vehicles";
import NoData from "../general/NoData";

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
  const { t, i18n } = useTranslation("cars");
  const queryClient = useQueryClient();
  const [openChatId, setOpenChatId] = useState<number | null>(null);
  // Local status map to allow immediate UI toggle feedback
  const [localStatusMap, setLocalStatusMap] = useState<Record<number, boolean>>(
    {}
  );

  // Fetch vehicles with filters
  const {
    data: vehiclesData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["vehicles", currentPage, searchTerm, filters],
    queryFn: () => {
      const queryFilters = { ...filters };

      // Only add search if it has a meaningful value
      if (searchTerm && searchTerm.trim() !== "") {
        queryFilters.search = searchTerm.trim();
      }

      return fetchVehicles(currentPage, {
        ...queryFilters,
        per_page: 10,
      });
    },
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

  // Initialize local status map when vehicles are loaded
  useEffect(() => {
    if (!vehiclesData) return;
    const map: Record<number, boolean> = {};
    const list = (vehiclesData as VehiclesApiResponse).data || [];
    list.forEach((v) => {
      const isSelected =
        v.status !== undefined ? v.status === 1 : !!v.is_active;
      map[v.id] = isSelected;
    });
    setLocalStatusMap((prev) => ({ ...map, ...prev }));
  }, [vehiclesData]);

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
    // Directly delete without showing a confirmation popup per UX requirement
    deleteVehicleMutation.mutate(id);
  };

  const handleToggleStatus = (vehicle: Vehicle) => {
    // Determine current status from local optimistic map first, then fallback to server fields
    const currentStatus =
      localStatusMap[vehicle.id] !== undefined
        ? localStatusMap[vehicle.id]
        : vehicle.status !== undefined
        ? vehicle.status === 1
        : !!vehicle.is_active;
    const newStatus = !currentStatus;

    console.log(
      "Toggle status for vehicle:",
      vehicle.id,
      "Current:",
      currentStatus,
      "New:",
      newStatus
    );
    // Optimistically update local UI state
    const previous = localStatusMap[vehicle.id] ?? currentStatus;
    setLocalStatusMap((s) => ({ ...s, [vehicle.id]: newStatus }));

    toggleStatusMutation.mutate(
      { id: vehicle.id, isActive: newStatus },
      {
        onError: () => {
          // Revert UI on error
          setLocalStatusMap((s) => ({ ...s, [vehicle.id]: previous }));
        },
      }
    );
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      // Use the current i18n language but force Latin numerals for Arabic locales
      const baseLocale = i18n?.language || "en-US";
      const locale = baseLocale.startsWith("ar")
        ? // Use Unicode locale extension to force Latin digits (nu=latn)
          `${baseLocale}-u-nu-latn`
        : baseLocale;

      // Use toLocaleString so date and time are both included
      return date.toLocaleString(locale, {
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
    try {
      const amount = Number(price);
      if (!Number.isFinite(amount))
        return `${price} ${t("currency") || "درهم"}`;
      // Use i18n locale for number formatting when available
      const locale = i18n?.language || undefined;
      const formatted = new Intl.NumberFormat(locale, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      }).format(amount);
      return formatted;
    } catch {
      return String(price);
    }
  };

  const getVehicleImage = (vehicle: Vehicle) => {
    if (vehicle.image && !vehicle.image.startsWith("http")) {
      // Clean double slashes and add base URL if needed
      const cleanPath = vehicle.image.replace(/\/+/g, "/");
      return cleanPath.startsWith("/") ? cleanPath : `/${cleanPath}`;
    }
    return vehicle.image || carImage;
  };

  // Helper function to safely get vehicle name (API returns name as string or VehicleName object)
  const getVehicleDisplayName = (name: string | VehicleName) => {
    if (typeof name === "string") return name || "-"; // just return string
    return i18n.language === "ar" ? name.ar || "-" : name.en || "-";
  };


  // Translate boolean-ish values to localized Yes/No
  const translateYesNo = (val: unknown) => {
    const isTrue = Boolean(val);
    return isTrue ? t("yes") || "نعم" : t("no") || "لا";
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
    console.log(
      "vehiclesData.data:",
      (vehiclesData as VehiclesApiResponse).data
    );
    console.log(
      "isArray:",
      Array.isArray((vehiclesData as VehiclesApiResponse).data)
    );
  }

  // Ensure vehicles is always an array
  const vehicles: Vehicle[] =
    vehiclesData && Array.isArray((vehiclesData as VehiclesApiResponse).data)
      ? (vehiclesData as VehiclesApiResponse).data
      : [];

      if (!vehicles.length) return <NoData />;

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
                    alt={getVehicleDisplayName(vehicle.name)}
                    className="w-[93px] h-[60px] object-cover rounded"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = carImage;
                    }}
                  />
                </TableCell>
                <TableCell>
                  {getVehicleDisplayName(vehicle.name)}
                </TableCell>
                <TableCell>
                  {vehicle.brand?.name[i18n.language as "ar" | "en"]}
                </TableCell>
                <TableCell>
                  {vehicle.agent?.name[i18n.language as "ar" | "en"]}
                </TableCell>
                <TableCell>-</TableCell>
                <TableCell>
                  {vehicle.vehicle_model?.name[i18n.language as "ar" | "en"]}
                </TableCell>
                <TableCell>{formatPrice(vehicle.price)}</TableCell>
                <TableCell>{translateYesNo(vehicle.is_discount)}</TableCell>
                <TableCell>
                  {vehicle.is_discount && vehicle.discount_value
                    ? `${vehicle.discount_value}%`
                    : "-"}
                </TableCell>
                <TableCell>
                  {translateYesNo(vehicle.offers && vehicle.offers.length > 0)}
                </TableCell>
                <TableCell>{translateYesNo(vehicle.is_include_tax)}</TableCell>
                <TableCell>
                  {translateYesNo(vehicle.is_include_warranty)}
                </TableCell>
                <TableCell>
                  {translateYesNo(vehicle.is_Insurance_warranty)}
                </TableCell>
                <TableCell>{translateYesNo(vehicle.is_rent_to_own)}</TableCell>
                <TableCell>{vehicle.views || 0}</TableCell>
                <TableCell>
                  {vehicle.created_at ? formatDate(vehicle.created_at) : "-"}
                </TableCell>
                <TableCell className="flex gap-[7px] items-center">
                  <Switch
                    isSelected={
                      localStatusMap[vehicle.id] !== undefined
                        ? localStatusMap[vehicle.id]
                        : vehicle.status !== undefined
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
              <ConversationPage conversationId={openChatId} />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CarsTable;
