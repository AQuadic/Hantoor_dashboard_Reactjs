import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
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
  const { t } = useTranslation("cars");
  const queryClient = useQueryClient();

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

  const rentToOwnData = vehicle.is_rent_to_own
    ? [
        {
          duration: vehicle.rent_to_own_duration
            ? `${vehicle.rent_to_own_duration} سنة`
            : "-",
          price: vehicle.rent_to_own_price || "-",
        },
      ]
    : [];

  return (
    <section className="md:mx-8 mx-0">
      <div className="w-full">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-right">السعر</TableHead>
              <TableHead className="text-right">المدة</TableHead>
              <TableHead className="text-right">الحالة</TableHead>
              <TableHead className="text-right"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rentToOwnData.map((item, index) => (
              <TableRow key={index} noBackgroundColumns={1} className="align-middle">
                <TableCell>{item.price}</TableCell>
                <TableCell className="w-full">{item.duration}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-[7px]">
                    <Switch checked={vehicle.is_rent_to_own} readOnly />

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
