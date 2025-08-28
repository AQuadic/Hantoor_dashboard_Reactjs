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
const MaintenancePackages = () => {
  const packages = [
    {
      id: 1,
      duration: "1 سنة أو 20,000 كم",
      price: "1000 درهم",
      status: true,
    },
    {
      id: 2,
      duration: "سنتين أو 40,000 كم",
      price: "2000 درهم",
      status: true,
    },
    {
      id: 3,
      duration: "3 سنوات أو 60,000 كم",
      price: "3000 درهم",
      status: false,
    },
  ];

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
                <TableCell>{pkg.duration}</TableCell>
                <TableCell className="w-full">{pkg.price}</TableCell>

                <TableCell className="flex items-center gap-2">
                  <Switch />
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
