import { Link } from "react-router";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import Edit from "../icons/general/Edit";
import TableDeleteButton from "../general/dashboard/table/TableDeleteButton";

const TermsTable = () => {
    const profile = [
    {
        id: 1,
        image: '/',
        text:'ودع الطرق التقليدية في البحث عن السيارات وفر وقتك و جهدك',
        country: 'مصر',
        description: 'Hantoor , حيث تلتقي التكنولوجيا بالتميز لتبسيط رحلتك نحو امتلاك السياره التي طالما حلمت بها...'
    },
    {
        id: 2,
        image: '/',
        text:'ودع الطرق التقليدية في البحث عن السيارات وفر وقتك و جهدك',
        country: 'مصر',
        description: 'Hantoor , حيث تلتقي التكنولوجيا بالتميز لتبسيط رحلتك نحو امتلاك السياره التي طالما حلمت بها...'
    },
    {
        id: 3,
        image: '/',
        text:'ودع الطرق التقليدية في البحث عن السيارات وفر وقتك و جهدك',
        country: 'مصر',
        description: 'Hantoor , حيث تلتقي التكنولوجيا بالتميز لتبسيط رحلتك نحو امتلاك السياره التي طالما حلمت بها...'
    },
    ];
    return (
        <Table>
        <TableHeader>
            <TableRow>
            <TableHead className="text-right">#</TableHead>
            <TableHead className="text-right">عنوان النص</TableHead>
            <TableHead className="text-right">البلد</TableHead>
            <TableHead className="text-right">الوصف</TableHead>
            <TableHead className="text-right">الحالة</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {profile.map((profie, index) => (
            <TableRow key={profie.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{profie.image}</TableCell>
                <TableCell>{profie.text}</TableCell>
                <TableCell>{profie.country}</TableCell>
                <TableCell>{profie.description}</TableCell>
                <TableCell className="flex gap-[7px] items-center">
                <Link to={`/profile/edit-termsandconditions/${profie.id}`}>
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

export default TermsTable
