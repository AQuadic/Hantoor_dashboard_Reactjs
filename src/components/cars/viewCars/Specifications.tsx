import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
const Specifications = () => {
    const specifications = [
    {
      brand: "تويوتا",
      category: "Runner 4",
      type: "Extreme",
      structure: "SUV",
      model: "2025",
      seates: "4",
      engineType: "بنزين",
      engineSize: "1200 CC",
      power: "رياضية",
    }
  ];

  return (
    <section className="md:mx-8 mx-0">
        <div className="w-full">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-right">الماركة</TableHead>
              <TableHead className="text-right">الفئة</TableHead>
              <TableHead className="text-right">النوع</TableHead>
              <TableHead className="text-right">نوع الهيكل</TableHead>
              <TableHead className="text-right">الموديل</TableHead>
              <TableHead className="text-right">عدد المقاعد</TableHead>
              <TableHead className="text-right">نوع الماكينة</TableHead>
              <TableHead className="text-right">حجم الماكينة</TableHead>
              <TableHead className="text-right">نوع قوة الماكينة</TableHead>

              <TableHead className="text-right"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {specifications.map((specification) => (
              <TableRow>
                <TableCell>{specification.brand}</TableCell>
                <TableCell>{specification.category}</TableCell>
                <TableCell>{specification.type}</TableCell>
                <TableCell>{specification.structure}</TableCell>
                <TableCell>{specification.model}</TableCell>
                <TableCell>{specification.seates}</TableCell>
                <TableCell>{specification.engineType}</TableCell>
                <TableCell>{specification.engineSize}</TableCell>
                <TableCell>{specification.power}</TableCell>
                <TableCell className=""></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  )
}

export default Specifications
