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
import { Link } from "react-router";
const AboutCar = () => {
  const insuranceData = [
    {
      id: 1,
      taxIncluded: "نعم",
      warrantyIncluded: "نعم",
      insuranceIncluded: "نعم",
      agentName: "الشركة الدولية التجارية",
      leaseToOwn: "يوجد",
      addedAt: "22/03/2024- 08:30 PM",
    },
  ];

  return (
    <section className="md:mx-8 mx-0">
      <div className="w-full">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-right min-w-[15%]">
                السعر شامل الضريبة
              </TableHead>
              <TableHead className="text-right min-w-[15%]">
                السعر شامل الضمان
              </TableHead>
              <TableHead className="text-right min-w-[15%]">
                السعر شامل التأمين
              </TableHead>
              <TableHead className="text-right min-w-[15%]">
                اسم الوكيل
              </TableHead>
              <TableHead className="text-right min-w-[15%]">
                إيجار منتهي بالتمليك
              </TableHead>
              <TableHead className="text-right w-full">
                تاريخ ووقت الإضافة
              </TableHead>
              <TableHead className="text-right min-w-[15%]">
                تاريخ ووقت الإضافة
              </TableHead>
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
                  <Edit />
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

export default AboutCar;
