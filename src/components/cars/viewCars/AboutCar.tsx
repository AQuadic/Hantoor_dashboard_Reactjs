import TableDeleteButton from "@/components/general/dashboard/table/TableDeleteButton";
import Edit from "@/components/icons/general/Edit";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Link } from "react-router";
import { Vehicle } from "@/api/vehicles/getVehicleById";
import { useTranslation } from "react-i18next";

interface AboutCarProps {
  vehicle: Vehicle;
}

const AboutCar = ({ vehicle }: AboutCarProps) => {
  const { i18n } = useTranslation();
  const lang = i18n.language;

  const insuranceData = [
    {
      id: vehicle.id,
      taxIncluded: vehicle.is_include_tax ? (lang === "ar" ? "نعم" : "Yes") : (lang === "ar" ? "لا" : "No"),
      warrantyIncluded: vehicle.is_include_warranty ? (lang === "ar" ? "نعم" : "Yes") : (lang === "ar" ? "لا" : "No"),
      insuranceIncluded: vehicle.is_Insurance_warranty ? (lang === "ar" ? "نعم" : "Yes") : (lang === "ar" ? "لا" : "No"),
      agentName: (vehicle.agent as any)?.name?.[lang] || "-",
      leaseToOwn: vehicle.is_rent_to_own ? (lang === "ar" ? "يوجد" : "Yes") : (lang === "ar" ? "لا يوجد" : "No"),
      addedAt: vehicle.created_at
        ? new Date(vehicle.created_at).toLocaleString(lang === "ar" ? "ar-EG" : "en-US", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })
        : "-",
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
                  <Link to={`/cars/edit/${vehicle.id}`}>
                    <Edit />
                  </Link>
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
