import DashboardButton from "@/components/general/dashboard/DashboardButton";
import {Select,SelectContent,SelectItem,SelectTrigger,SelectValue,} from "@/components/ui/select";
import { Link } from "react-router";

const InsuranceHeader = () => {
    return (
        <div className="flex items-center justify-between">
            <div className="w-full">
                <Select>
                <SelectTrigger
                    className="w-[160px] !h-[53px] rounded-[12px] -mt-2 bg-white"
                    dir="rtl"
                >
                    <SelectValue placeholder="البلد" />
                </SelectTrigger>
                <SelectContent dir="rtl">
                    <SelectItem value="1">الجميع</SelectItem>
                    <SelectItem value="2">الجميع</SelectItem>
                    <SelectItem value="3">الجميع</SelectItem>
                </SelectContent>
                </Select>
            </div>
            <Link to='/setting/add-whatsapp'>
                <DashboardButton titleAr={'اضافة رقم واتساب جديد'} titleEn="Add a new whatsapp number" variant="add" />
            </Link>
        </div>
    )
}

export default InsuranceHeader
