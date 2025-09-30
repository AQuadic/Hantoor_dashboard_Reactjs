import TableDeleteButton from "@/components/general/dashboard/table/TableDeleteButton";
import Edit from "@/components/icons/general/Edit";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Link, useNavigate } from "react-router";
import { Vehicle } from "@/api/vehicles/getVehicleById";
import { useTranslation } from "react-i18next";
import { toast } from "react-hot-toast";
import { deleteVehicle } from "@/api/vehicles";
import { useHasPermission } from "@/hooks/usePermissions";

interface AboutCarProps {
  vehicle: Vehicle;
}

const AboutCar = ({ vehicle }: AboutCarProps) => {
  const { t, i18n } = useTranslation("cars");
  const lang = i18n.language;
  const navigate = useNavigate();
  const canEdit = useHasPermission("edit_vehicle");
  const insuranceData = [
    {
      id: vehicle.id,
      taxIncluded: vehicle.is_include_tax
        ? lang === "ar"
          ? "نعم"
          : "Yes"
        : lang === "ar"
        ? "لا"
        : "No",
      warrantyIncluded: vehicle.is_include_warranty
        ? lang === "ar"
          ? "نعم"
          : "Yes"
        : lang === "ar"
        ? "لا"
        : "No",
      insuranceIncluded: vehicle.is_Insurance_warranty
        ? lang === "ar"
          ? "نعم"
          : "Yes"
        : lang === "ar"
        ? "لا"
        : "No",
      agentName: (vehicle.agent as any)?.name?.[lang] || "-",
      leaseToOwn: vehicle.is_rent_to_own
        ? lang === "ar"
          ? "يوجد"
          : "Yes"
        : lang === "ar"
        ? "لا يوجد"
        : "No",
      addedAt: vehicle.created_at
        ? new Date(vehicle.created_at).toLocaleString(
            lang === "ar" ? "ar-EG" : "en-US",
            {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            }
          )
        : "-",
    },
  ];

  const handleDelete = async (id: number) => {
    try {
      await deleteVehicle(id);
      toast.success(
        lang === "ar" ? "تم حذف السيارة بنجاح" : "Vehicle deleted successfully"
      );
      navigate("/cars");
    } catch (error: any) {
      const message =
        error.response?.data?.message ||
        error.message ||
        (lang === "ar" ? "حدث خطأ أثناء الحذف" : "Error deleting vehicle");

      toast.error(message);
    }
  };

  return (
    <section className="md:mx-8 mx-0">
      <div className="w-full">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-right min-w-[15%]">
                {t("priceIncludesTax")}
              </TableHead>
              <TableHead className="text-right min-w-[15%]">
                {t("priceIncludesWarranty")}
              </TableHead>
              <TableHead className="text-right min-w-[15%]">
                {t("priceIncludesInsurance")}
              </TableHead>
              <TableHead className="text-right min-w-[15%]">
                {t("agentName")}
              </TableHead>
              <TableHead className="text-right min-w-[15%]">
                {t("leaseToOwn")}
              </TableHead>
              <TableHead className="text-right w-full">
                {t("addedAt")}
              </TableHead>
              <TableHead className="text-right min-w-[15%]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {insuranceData.map((row, idx) => (
              <TableRow key={idx} noBackgroundColumns={1}>
                <TableCell className="min-w-[15%]">{row.taxIncluded}</TableCell>
                <TableCell className="min-w-[15%]">
                  {row.warrantyIncluded}
                </TableCell>
                <TableCell className="min-w-[15%]">
                  {row.insuranceIncluded}
                </TableCell>
                <TableCell className="min-w-[15%]">
                  <Link
                    to={`/cars/agent/${row.id}`}
                    className="text-primary underline cursor-pointer"
                  >
                    {row.agentName}
                  </Link>
                </TableCell>
                <TableCell className="min-w-[15%]">{row.leaseToOwn}</TableCell>
                <TableCell className="w-full">{row.addedAt}</TableCell>
                <TableCell className=" flex items-center gap-2">
                  {canEdit && (
                    <Link to={`/cars/edit/${vehicle.id}`}>
                      <Edit />
                    </Link>
                  )}
                  <TableDeleteButton
                    handleDelete={() => handleDelete(vehicle.id)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
};

export default AboutCar;
