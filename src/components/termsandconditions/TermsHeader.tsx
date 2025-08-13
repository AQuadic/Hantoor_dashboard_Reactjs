import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link } from "react-router";
import DashboardButton from "../general/dashboard/DashboardButton";
import { useTranslation } from "react-i18next";

const TermsHeader = () => {
  const { i18n } = useTranslation("setting");
  const isRTL = i18n.language === "ar";

    return (
        <div className="flex items-center justify-between">
                <div className="w-full">
                    <Select>
                    <SelectTrigger
                        className="w-[160px] !h-[53px] rounded-[12px] mt-4 bg-white"
                        dir={isRTL ? "rtl" : "ltr"}
                    >
                        <SelectValue placeholder={isRTL ? "البلد" : "Country"} />
                    </SelectTrigger>
                    <SelectContent dir={isRTL ? "rtl" : "ltr"}>
                        <SelectItem value="1">{isRTL ? "الجميع" : "All"}</SelectItem>
                        <SelectItem value="2">{isRTL ? "الجميع" : "All"}</SelectItem>
                        <SelectItem value="3">{isRTL ? "الجميع" : "All"}</SelectItem>
                    </SelectContent>
                    </Select>
                </div>
                <Link to='/setting/add-terms'>
                    <DashboardButton titleAr={'اضافة شروط واحكام جديدة'} titleEn="Add new terms and conditions" variant="add" />
                </Link>
            </div>
    )
}

export default TermsHeader
