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
import { updatePackage } from "@/api/vehicles/packages/updatePackage";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

interface MaintenancePackagesProps {
  packages: Vehicle["packages"];
  refetch: () => void
}

const MaintenancePackages = ({ packages, refetch }: MaintenancePackagesProps) => {
  const { t } = useTranslation("cars");
  const [localPackages, setLocalPackages] = useState(packages);

  useEffect(() => {
    setLocalPackages(packages);
  }, [packages]);

  if (!localPackages || localPackages.length === 0) {
    return <NoData />;
  }

    const handleDelete = async (id: number) => {
    await deletePackages(id);
    toast.success(t("packageDeleted"));
    refetch();
    };

  const handleToggleActive = async (pkg: Vehicle["packages"][0]) => {
    try {
      const updated = await updatePackage(pkg.id, {
        name: pkg.name,
        price: String(pkg.price),
        is_active: !pkg.is_active,
      });

      setLocalPackages((prev) =>
        prev.map((p) => (p.id === pkg.id ? { ...p, is_active: updated.is_active } : p))
      );

      toast.success(
        updated.is_active ? t("vehicleStatusUpdated") : t("vehicleStatusUpdated")
      );

      setTimeout(() => {
        refetch();
      }, 0);
    } catch (error: any) {
      console.error(error);
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error(t("somethingWentWrong"));
      }
    }
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
            {localPackages.map((pkg) => (
              <TableRow key={pkg.id} noBackgroundColumns={1}>
                <TableCell>{pkg.id}</TableCell>
                <TableCell>{pkg.name.ar || pkg.name.en || "-"}</TableCell>
                <TableCell className="w-full">{pkg.price} درهم</TableCell>
                <TableCell className="flex items-center gap-2">
                  <Switch
                    isSelected={pkg.is_active}
                    onValueChange={() => handleToggleActive(pkg)} // 👈 use onValueChange instead of onChange
                  />
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
