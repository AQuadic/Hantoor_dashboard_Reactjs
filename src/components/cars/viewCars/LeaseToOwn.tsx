import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Switch } from "@heroui/react";
import TableDeleteButton from "@/components/general/dashboard/table/TableDeleteButton";
import { Vehicle } from "@/api/vehicles/getVehicleById";
import NoData from "@/components/general/NoData";

interface LeaseToOwnProps {
  vehicle?: Vehicle;
}

const LeaseToOwn = ({ vehicle }: LeaseToOwnProps) => {
  if (!vehicle) return <NoData />; 

  const rentToOwnData = vehicle.is_rent_to_own
    ? [
        {
          duration: vehicle.rent_to_own_duration
            ? `${vehicle.rent_to_own_duration} سنة`
            : "-",
          price: vehicle.rent_to_own_price
            ? `${vehicle.rent_to_own_price}`
            : "-",
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
              <TableRow key={index} noBackgroundColumns={1}>
                <TableCell>{item.price}</TableCell>
                <TableCell className="w-full">{item.duration}</TableCell>
                <TableCell className="flex items-center gap-[7px]">
                  <Switch defaultChecked={vehicle.is_rent_to_own} />
                  <img src="/images/whatsapp.svg" alt="WhatsApp" />
                  <div className="mt-2">
                    <TableDeleteButton handleDelete={() => {}} />
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
