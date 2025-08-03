import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import accessoriesImg from '/images/accessories.png';
import accessoriesImg2 from '/images/accessories2.png';
import { Switch } from "@heroui/react";
import DeleteModal from "@/components/general/DeleteModal";
import TableDeleteButton from "@/components/general/dashboard/table/TableDeleteButton";

const Accessories = () => {
  const accessories = [
    {
      image: accessoriesImg,
      name: "فامية",
      price: "500 درهم",
    },
    {
      image: accessoriesImg2,
      name: "سيراميك",
      price: "500 درهم",
    }
  ];

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
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell><img src={accessory.image} alt={accessory.name} /></TableCell>
                <TableCell>{accessory.name}</TableCell>
                <TableCell className="w-full">{accessory.price}</TableCell>
                <TableCell className="flex items-center gap-[7px]">
                  <Switch />
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
