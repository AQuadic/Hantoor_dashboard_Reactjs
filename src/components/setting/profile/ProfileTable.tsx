import { Link } from "react-router";
import TableDeleteButton from "../../general/dashboard/table/TableDeleteButton";
import Edit from "../../icons/general/Edit";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "../../ui/table";
import profileImg from '/images/profileImg.png'
import profileImg2 from '/images/profileImg2.png'

const ProfileTable = () => {
    const profile = [
    {
        id: 1,
        image: profileImg,
        text:'ودع الطرق التقليدية في البحث عن السيارات وفر وقتك و جهدك',
        country: 'السعودية',
        description: 'Hantoor , حيث تلتقي التكنولوجيا بالتميز لتبسيط رحلتك نحو امتلاك السياره التي طالما حلمت بها...'
    },
    {
        id: 2,
        image: profileImg2,
        text:'استكشف ، قارن و اختار',
        country: 'مصر',
        description: 'Hantoor , حيث تلتقي التكنولوجيا بالتميز لتبسيط رحلتك نحو امتلاك السياره التي طالما حلمت بها...'
    },
    ];
    return (
        <Table>
        <TableHeader>
            <TableRow>
            <TableHead className="text-right">#</TableHead>
            <TableHead className="text-right">الصورة</TableHead>
            <TableHead className="text-right">عنوان النص</TableHead>
            <TableHead className="text-right">البلد</TableHead>
            <TableHead className="text-right">الوصف</TableHead>
            <TableHead className="text-right">الحالة</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {profile.map((profie, index) => (
            <TableRow key={profie.id} noBackgroundColumns={1}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                    <img src={profie.image} alt="car" />
                </TableCell>
                <TableCell>{profie.text}</TableCell>
                <TableCell>{profie.country}</TableCell>
                <TableCell className="w-full">{profie.description}</TableCell>
                <TableCell className="flex gap-[7px] items-center">
                <Link to={`/profile/edit/${profie.id}`}>
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

export default ProfileTable
