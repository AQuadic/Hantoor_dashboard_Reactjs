import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Vehicle } from "@/api/vehicles/getVehicleById";
import { useTranslation } from "react-i18next";

interface SpecificationsProps {
  vehicle: Vehicle;
}

const Specifications = ({ vehicle }: SpecificationsProps) => {
  const { i18n } = useTranslation();
  const lang = i18n.language as "ar" | "en";

  const specifications = [
    {
      brand: vehicle.brand?.name[lang] || "-",
      category: (vehicle.vehicle_class?.name as Record<"ar" | "en", string>)?.[lang] || "-",
      type: (vehicle.vehicle_model?.name as Record<"ar" | "en", string>)?.[lang] || "-",
      structure: (vehicle.vehicle_body_type?.name as Record<"ar" | "en", string>)?.[lang] || "-",
      model: (vehicle.vehicle_type?.name as Record<"ar" | "en", string>)?.[lang] || "-",
      seates: (vehicle.number_of_seat as any)?.name?.[lang] || "-",
      engineType: (vehicle.engine_type as any)?.name?.[lang] || "-",
      engineSize: (vehicle.engine_volume as any)?.name?.[lang] || "-",
      power: "-",
    },
  ];

  return (
    <section className="md:mx-8 mx-0">
      <div className="w-full">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-right">{lang === "ar" ? "الماركة" : "Brand"}</TableHead>
              <TableHead className="text-right">{lang === "ar" ? "الفئة" : "Category"}</TableHead>
              <TableHead className="text-right">{lang === "ar" ? "النوع" : "Type"}</TableHead>
              <TableHead className="text-right">{lang === "ar" ? "نوع الهيكل" : "Structure"}</TableHead>
              <TableHead className="text-right">{lang === "ar" ? "الموديل" : "Model"}</TableHead>
              <TableHead className="text-right">{lang === "ar" ? "عدد المقاعد" : "Seats"}</TableHead>
              <TableHead className="text-right">{lang === "ar" ? "نوع الماكينة" : "Engine Type"}</TableHead>
              <TableHead className="text-right">{lang === "ar" ? "حجم الماكينة" : "Engine Size"}</TableHead>
              {/* <TableHead className="text-right">{lang === "ar" ? "نوع قوة الماكينة" : "Power"}</TableHead> */}
              <TableHead className="text-right"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {specifications.map((specification, idx) => (
              <TableRow key={idx} noBackgroundColumns={1}>
                <TableCell>{specification.brand}</TableCell>
                <TableCell>{specification.category}</TableCell>
                <TableCell>{specification.model}</TableCell>
                <TableCell>{specification.structure}</TableCell>
                <TableCell>{specification.type}</TableCell>
                <TableCell>{specification.seates}</TableCell>
                <TableCell>{specification.engineType}</TableCell>
                <TableCell>{specification.engineSize}</TableCell>
                {/* <TableCell>{specification.power}</TableCell> */}
                <TableCell></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  )
}

export default Specifications
