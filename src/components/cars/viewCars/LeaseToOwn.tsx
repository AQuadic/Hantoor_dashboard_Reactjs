import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Switch } from "@heroui/react";
import TableDeleteButton from "@/components/general/dashboard/table/TableDeleteButton";
import { Vehicle } from "@/api/vehicles/getVehicleById";
import NoData from "@/components/general/NoData";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { updateVehicle } from "@/api/vehicles";
import { useTranslation } from "react-i18next";

interface LeaseToOwnProps {
  vehicle?: Vehicle;
}

const LeaseToOwn = ({ vehicle }: LeaseToOwnProps) => {
  const { t, i18n } = useTranslation("cars");
  const queryClient = useQueryClient();

  const [isRentToOwn, setIsRentToOwn] = useState(
    vehicle?.is_rent_to_own || false
  );
  const [loading, setLoading] = useState(false);

  // Sync isRentToOwn state with vehicle data when it changes
  useEffect(() => {
    if (vehicle) {
      setIsRentToOwn(vehicle.is_rent_to_own || false);
    }
  }, [vehicle]);

  const handleToggle = async () => {
    if (!vehicle) return;

    setLoading(true);
    const newValue = !isRentToOwn;
    try {
      // When disabling, clear all rent-to-own related data (like in AddCars)
      // Helper to convert duration to string format expected by API
      const getDurationString = () => {
        if (!vehicle.rent_to_own_duration) return undefined;
        if (typeof vehicle.rent_to_own_duration === "string") {
          return vehicle.rent_to_own_duration;
        }
        if (typeof vehicle.rent_to_own_duration === "object") {
          const dur = vehicle.rent_to_own_duration as {
            ar?: string;
            en?: string;
          };
          return dur.ar || dur.en || undefined;
        }
        return String(vehicle.rent_to_own_duration);
      };

      const updatePayload = {
        id: vehicle.id,
        name:
          typeof vehicle.name === "string"
            ? { ar: vehicle.name, en: vehicle.name }
            : vehicle.name,
        country_id: vehicle.country_id?.toString(),
        brand_id: vehicle.brand_id?.toString(),
        agent_id: vehicle.agent_id?.toString(),
        vehicle_model_id: vehicle.vehicle_model_id?.toString(),
        vehicle_body_type_id: vehicle.vehicle_body_type_id?.toString(),
        vehicle_type_id: vehicle.vehicle_type_id?.toString(),
        vehicle_class_id: vehicle.vehicle_class_id?.toString(),
        brand_origin_id: vehicle.brand_origin_id?.toString(),
        number_of_seat_id: vehicle.number_of_seat_id?.toString(),
        engine_type_id: vehicle.engine_type_id?.toString(),

        is_rent_to_own: newValue,
        // Clear all rent-to-own data when disabling
        ...(newValue
          ? {
              rent_to_own_price: vehicle.rent_to_own_price,
              rent_to_own_whatsapp: vehicle.rent_to_own_whatsapp,
              rent_to_own_duration: getDurationString(),
            }
          : {
              rent_to_own_price: undefined,
              rent_to_own_whatsapp: undefined,
              rent_to_own_duration: undefined,
            }),
      };

      await updateVehicle(vehicle.id, updatePayload);

      setIsRentToOwn(newValue);
      toast.dismiss();
      // Show appropriate message based on enable/disable action
      toast.success(newValue ? t("rentToOwnEnabled") : t("rentToOwnDisabled"));
      queryClient.invalidateQueries({ queryKey: ["vehicle", vehicle.id] });
    } catch {
      toast.error(t("error"));
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!vehicle) return;

    try {
      await updateVehicle(vehicle.id, {
        id: vehicle.id,
        name: vehicle.name,
        country_id: vehicle.country_id?.toString(),
        brand_id: vehicle.brand_id?.toString(),
        agent_id: vehicle.agent_id?.toString(),
        vehicle_model_id: vehicle.vehicle_model_id?.toString(),
        vehicle_body_type_id: vehicle.vehicle_body_type_id?.toString(),
        vehicle_type_id: vehicle.vehicle_type_id?.toString(),
        vehicle_class_id: vehicle.vehicle_class_id?.toString(),
        brand_origin_id: vehicle.brand_origin_id?.toString(),
        number_of_seat_id: vehicle.number_of_seat_id?.toString(),
        engine_type_id: vehicle.engine_type_id?.toString(),

        is_rent_to_own: false,
        rent_to_own_price: undefined,
        rent_to_own_whatsapp: undefined,
        rent_to_own_duration: undefined,
      });
      toast.success(t("rentToOwnDeleted"));

      if (vehicle?.id) {
        queryClient.invalidateQueries({ queryKey: ["vehicle", vehicle.id] });
      }
    } catch {
      toast.error("error");
    }
  };

  if (!vehicle) return <NoData />;

  // Helper to get localized duration string (API may return string or {ar,en})
  const getDurationStr = (duration: unknown) => {
    if (!duration) return "";
    if (typeof duration === "string") return duration;
    if (typeof duration === "object") {
      const dur = duration as { ar?: string; en?: string };
      const lang = i18n.language?.startsWith("ar") ? "ar" : "en";
      return (lang === "ar" ? dur.ar : dur.en) || dur.ar || dur.en || "";
    }
    // fallback for other primitives
    return typeof duration === "number" ? String(duration) : "";
  };

  const rentToOwnData = [
    {
      duration: isRentToOwn
        ? getDurationStr(vehicle.rent_to_own_duration)
        : "-",
      price: isRentToOwn ? vehicle.rent_to_own_price || "-" : "-",
    },
  ];

  if (
    !isRentToOwn ||
    (!vehicle.rent_to_own_duration &&
      !vehicle.rent_to_own_price &&
      !vehicle.rent_to_own_whatsapp)
  ) {
    return <NoData />;
  }

  return (
    <section className="md:mx-8 mx-0">
      <div className="w-full">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-right">{t("price")}</TableHead>
              <TableHead className="text-right">{t("duration")}</TableHead>
              <TableHead className="text-right">{t("status")}</TableHead>
              <TableHead className="text-right"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rentToOwnData.map((item) => (
              <TableRow
                key={`rent-to-own`}
                noBackgroundColumns={1}
                className="align-middle"
              >
                <TableCell>{item.price}</TableCell>
                <TableCell className="w-full">{item.duration}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-[7px]">
                    <Switch
                      isSelected={isRentToOwn}
                      onChange={handleToggle}
                      disabled={loading}
                    />

                    {vehicle.rent_to_own_whatsapp && (
                      <a
                        href={`https://wa.me/${vehicle.rent_to_own_whatsapp}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-shrink-0"
                      >
                        <img
                          src="/images/whatsapp.svg"
                          alt="WhatsApp"
                          className="object-contain"
                        />
                      </a>
                    )}
                    <TableDeleteButton handleDelete={handleDelete} />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
};

export default LeaseToOwn;
