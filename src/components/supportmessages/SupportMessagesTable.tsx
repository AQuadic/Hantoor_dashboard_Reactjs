import { useNavigate } from "react-router-dom";
import TableDeleteButton from "../general/dashboard/table/TableDeleteButton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "../ui/table";
import View from "../icons/general/View";
import { Link } from "react-router";

const SupportMessagesTable = () => {
    const navigate = useNavigate();

    const supportMessages = [
        {
            id: 1,
            number: "6881066",
            country: "الامارات",
            question: "صعوبة في التواصل مع الوكلاء أو المعارض",
            name: "مصطفي محمد",
            phone: "+966 123456 789"
        },
        {
            id: 2,
            number: "6881066",
            country: "مصر",
            question: "صعوبة في التواصل مع الوكلاء أو المعارض",
            name: "مصطفي محمد",
            phone: "+966 123456 789"
        },
        {
            id: 3,
            number: "6881066",
            country: "الامارات",
            question: "صعوبة في التواصل مع الوكلاء أو المعارض",
            name: "مصطفي محمد",
            phone: "+966 123456 789"
        },
    ];
    return (
        <Table>
        <TableHeader>
            <TableRow>
            <TableHead className="text-right">#</TableHead>
            <TableHead className="text-right">رقم الدعم</TableHead>
            <TableHead className="text-right">البلد</TableHead>
            <TableHead className="text-right">السؤال</TableHead>
            <TableHead className="text-right">اسم المستخدم</TableHead>
            <TableHead className="text-right">رقم الجوال</TableHead>
            <TableHead className="text-right">حالة الدعم</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {supportMessages.map((message, index) => (
            <TableRow
                key={message.id}
                onClick={() => navigate(`/faq/details/${message.id}`)}
                className="cursor-pointer hover:bg-gray-100"
            >
                <TableCell>{index + 1}</TableCell>
                <TableCell>{message.number}</TableCell>
                <TableCell>{message.country}</TableCell>
                <TableCell>{message.question}</TableCell>
                <TableCell>{message.name}</TableCell>
                <TableCell>{message.phone}</TableCell>
                <TableCell
                    className="flex gap-[7px] items-center"
                    onClick={(e) => e.stopPropagation()} 
                    >
                    <div className="flex items-center gap-[10px]">
                        <button className="w-[78px] h-[37px] bg-[#2A32F8] rounded-[8.15px] text-[#FFFFFF] font-bold text-[13px]">جاري العمل</button>
                        <button className="w-[78px] h-[37px] bg-[#FFFFFF] rounded-[8.15px] text-[#A1A1A1] font-normal text-[13px]">تم الانتهاء</button>
                        <input 
                            type="text" 
                            name="notes" 
                            id="notes" 
                            className="w-[195px] h-[37px] bg-[#FFFFFF] border border-[#D8D8D8] rounded-[10px] focus:outline-none px-3 placeholder:text-[13px]"
                            placeholder="ملاحظاتك"
                        />
                    </div>
                    <Link to='/support-messages/view'><View /></Link>
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

export default SupportMessagesTable
