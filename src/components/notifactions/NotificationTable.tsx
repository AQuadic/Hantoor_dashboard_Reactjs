import { Link } from "react-router-dom";
import TableDeleteButton from "../general/dashboard/table/TableDeleteButton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "../ui/table";
import notificationCar from '/images/notificationCar.png'
import View from "../icons/general/View";
const NotificationTable = () => {

  const notifications = [
    {
        id: 1,
        image:notificationCar,
        text: "حماية البيانات",
        country: "الامارات",
        description: "أي معلومات شخصية تزودنا بها عند استخدامك لهذا الموقع سوف تعامل وفقاً لسياسة الخصوصية الموجودة لدينا والحفاظ علي...",
    },
    {
        id: 2,
        image:notificationCar,
        text: "القواعد العامه",
        country: "مصر",
        description: "أي معلومات شخصية تزودنا بها عند استخدامك لهذا الموقع سوف تعامل وفقاً لسياسة الخصوصية الموجودة لدينا والحفاظ علي...",
    },
    {
        id: 3,
        image:notificationCar,
        text: "تحذير",
        country: "السعودية",
        description: "أي معلومات شخصية تزودنا بها عند استخدامك لهذا الموقع سوف تعامل وفقاً لسياسة الخصوصية الموجودة لدينا والحفاظ علي...",
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
            {notifications.map((notification, index) => (
            <TableRow
                key={notification.id}
            >
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                    <img src={notification.image} alt="Car" className="rounded-[8px]"/>
                </TableCell>
                <TableCell>{notification.text}</TableCell>
                <TableCell>{notification.country}</TableCell>
                <TableCell className="w-full">{notification.description}</TableCell>
                <TableCell
                className="flex gap-[7px] items-center"
                onClick={(e) => e.stopPropagation()} 
                >
                <Link to={`/notifications/details/${notification.id}`}>
                    <View />
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

export default NotificationTable
