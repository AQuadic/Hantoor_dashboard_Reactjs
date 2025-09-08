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

interface MaintenancePackagesProps {
  packages: Vehicle["packages"];
}

const MaintenancePackages = ({ packages }: MaintenancePackagesProps) => {
  if (!packages || packages.length === 0) {
    return <NoData />;
  }

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
                  <TableDeleteButton handleDelete={() => {}} />
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
