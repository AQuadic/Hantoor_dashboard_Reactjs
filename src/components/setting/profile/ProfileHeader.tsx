import {Select,SelectContent,SelectItem,SelectTrigger,SelectValue,} from "@/components/ui/select";
import DashboardButton from "../../general/dashboard/DashboardButton";
import { Link } from "react-router";

const ProfileHeader = () => {
    return (
        <div className="flex items-center justify-between">
            <div className="w-full">
                <Select>
                <SelectTrigger
                    className="w-[160px] !h-[53px] rounded-[12px] mt-4 bg-white"
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
                <DashboardButton title={'اضافة صفحة تعريفية جديدة'} variant="add" />
            </Link>
        </div>
    )
}

export default ProfileHeader
