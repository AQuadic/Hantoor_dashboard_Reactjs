import TableDeleteButton from "@/components/general/dashboard/table/TableDeleteButton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Switch } from "@heroui/react";
import { Vehicle } from "@/api/vehicles/getVehicleById";
import NoData from "@/components/general/NoData";
import { deletePackages } from "@/api/vehicles/packages/deletePackages";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

interface MaintenancePackagesProps {
  packages: Vehicle["packages"];
  refetch: () => void
}

const MaintenancePackages = ({ packages, refetch }: MaintenancePackagesProps) => {
  const { t } = useTranslation("cars");

  if (!packages || packages.length === 0) {
    return <NoData />;
  }

    const handleDelete = async (id: number) => {
    await deletePackages(id);
    toast.success(t("packageSizeDeleted"));
    refetch();
  };

  return (
    <section className="md:mx-8 mx-0">
      <div className="w-full">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-right">#</TableHead>
              <TableHead className="text-right">المدة/المسافة</TableHead>
              <TableHead className="text-right">السعر</TableHead>
              <TableHead className="text-right">الحالة</TableHead>
              <TableHead className="text-right"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {packages.map((pkg) => (
              <TableRow key={pkg.id} noBackgroundColumns={1}>
                <TableCell>{pkg.id}</TableCell>
                <TableCell>{pkg.name.ar || pkg.name.en || "-"}</TableCell>
                <TableCell className="w-full">{pkg.price} درهم</TableCell>
                <TableCell className="flex items-center gap-2">
                  <Switch isSelected={pkg.is_active} />
                  <TableDeleteButton handleDelete={() => handleDelete(pkg.id)} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
};

export default MaintenancePackages;
