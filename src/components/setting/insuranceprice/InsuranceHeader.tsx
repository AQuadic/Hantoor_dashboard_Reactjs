import DashboardButton from "@/components/general/dashboard/DashboardButton";
import {Select,SelectContent,SelectItem,SelectTrigger,SelectValue,} from "@/components/ui/select";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";

const InsuranceHeader = () => {
  const { t, i18n } = useTranslation("setting");
  const isRTL = i18n.language === "ar";

    return (
        <div className="flex items-center justify-between">
            <div className="w-full">
                <Select>
                <SelectTrigger
                    className="w-[160px] !h-[53px] rounded-[12px] -mt-2 bg-white"
                    dir={isRTL ? "rtl" : "ltr"}
                >
                    <SelectValue placeholder={t("country")} />
                </SelectTrigger>
                <SelectContent dir={isRTL ? "rtl" : "ltr"}>
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
