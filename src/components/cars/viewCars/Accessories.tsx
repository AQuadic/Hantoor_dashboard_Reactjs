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
import { Accessory } from "@/api/vehicles/getVehicleById";

const Accessories = ({ accessories }: { accessories: Accessory[] }) => {
  return (
    <section className="md:mx-8 mx-0">
      <div className="w-full">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-right">#</TableHead>
              <TableHead className="text-right">الصورة</TableHead>
              <TableHead className="text-right">الاسم</TableHead>
              <TableHead className="text-right">السعر</TableHead>
              <TableHead className="text-right">الحالة</TableHead>
              <TableHead className="text-right"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {accessories.map((accessory, index) => (
              <TableRow key={accessory.id} noBackgroundColumns={1}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  {accessory.image?.url ? (
                    <img
                      src={accessory.image.url}
                      alt={accessory.name.ar || accessory.name.en || "accessory"}
                      className="w-16 h-16 object-cover rounded"
                    />
                  ) : (
                    <span>-</span>
                  )}
                </TableCell>
                <TableCell>
                  {accessory.name.ar || accessory.name.en || "-"}
                </TableCell>
                <TableCell className="w-full">{accessory.price} درهم</TableCell>
                <TableCell className="flex items-center gap-[7px]">
                  <Switch isSelected={accessory.is_active} />
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

export default Accessories;
