import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Switch } from "@heroui/react";
import TableDeleteButton from "@/components/general/dashboard/table/TableDeleteButton";

const LeaseToOwn = () => {
  const accessories = [
    {
      duration: "3 سنوات",
      price: "500 درهم",
    },
  ];

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
            {accessories.map((accessory, index) => (
              <TableRow key={index}>
                <TableCell className="">{accessory.price}</TableCell>
                <TableCell className="w-full">{accessory.duration}</TableCell>
                <TableCell className="flex items-center gap-[7px]">
                  <Switch />
                  <img src="/images/whatsapp.svg" alt="" />
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
