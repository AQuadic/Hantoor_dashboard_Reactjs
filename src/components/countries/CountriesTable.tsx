import { Link } from "react-router";
import TableDeleteButton from "../general/dashboard/table/TableDeleteButton";
import Edit from "../icons/general/Edit";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "../ui/table";
import { Switch } from "@heroui/react";

const CountriesTable = () => {
    const countries = [
    {
        id: 1,
        question: "مشكلة في عرض السيارات أو البيانات",
        country: "الامارات",
        currency: "درهم اماراتي",
        count: 23,
        date: "22/03/2024- 08:30 PM"
    },
    {
        id: 2,
        question: "مشكلة في عرض السيارات أو البيانات",
        country: "مصر",
        currency: "جنية مصري",
        count: 15,
        date: "22/03/2024- 08:30 PM"
    },
    {
        id: 3,
        question: "مشكلة في عرض السيارات أو البيانات",
        country: "السعودية",
        currency: "ريال سعودي",
        count: 13,
        date: "22/03/2024- 08:30 PM"
    },
    ];
    return (
        <Table>
        <TableHeader>
            <TableRow>
            <TableHead className="text-right">#</TableHead>
            <TableHead className="text-right">اسم البلد</TableHead>
            <TableHead className="text-right">العملة</TableHead>
            <TableHead className="text-right">عدد المشتركين من المستخدمين</TableHead>
            <TableHead className="text-right">تاريخ ووقت الاضافة</TableHead>
            <TableHead className="text-right">الحالة</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {countries.map((country, index) => (
            <TableRow key={country.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{country.country}</TableCell>
                <TableCell>{country.currency}</TableCell>
                <TableCell className="">{country.count}</TableCell>
                <TableCell className="w-full">{country.date}</TableCell>
                <TableCell className="flex gap-[7px] items-center">
                <Switch />
                <Link to="/countries/edit">
                    <Edit />
                </Link>

                <div className="mt-2">
                <TableDeleteButton handleDelete={() => {}} />
                </div>
                </TableCell>
            </TableRow>
            ))}
        </TableBody>
        </Table>
    )
}

export default CountriesTable
