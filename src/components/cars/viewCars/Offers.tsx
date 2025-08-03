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

const offers = [
  {
    id: 1,
    name: "تسجيل مجاني",
    details: "-",
    image: "/images/offers/offer1.png",
    status: true,
  },
  {
    id: 2,
    name: "تحليل مجاني",
    details: "-",
    image: "/images/offers/offer2.png",
    status: true,
  },
  {
    id: 3,
    name: "كاش باك",
    details: "-",
    image: "/images/offers/offer3.png",
    status: false,
  },
  {
    id: 4,
    name: "بنزين مجاني",
    details: "20.0 لتر",
    image: "/images/offers/offer4.png",
    status: false,
  },
  {
    id: 5,
    name: "تامين مجاني",
    details: "40.000 كم",
    image: "/images/offers/offer5.png",
    status: true,
  },
  {
    id: 6,
    name: "صيانة مجانية",
    details: "3 سنوات",
    image: "/images/offers/offer6.png",
    status: true,
  },
];

const Offers = () => (
  <section className="md:mx-8 mx-0">
    <div className="w-full">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-right ">#</TableHead>
            <TableHead className="text-right ">الصورة</TableHead>
            <TableHead className="text-right w-[10%]">الاسم</TableHead>
            <TableHead className="text-right w-[10%]">تفاصيل</TableHead>
            <TableHead className="text-right">الحالة</TableHead>
            <TableHead className="text-right"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {offers.map((offer) => (
            <TableRow key={offer.id}>
              <TableCell className="">{offer.id}</TableCell>
              <TableCell className="">image</TableCell>
              <TableCell className="w-[10%]">{offer.name}</TableCell>
              <TableCell className=" w-full">{offer.details}</TableCell>

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

export default Offers;
