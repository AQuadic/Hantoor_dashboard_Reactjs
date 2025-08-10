import DashboardButton from "@/components/general/dashboard/DashboardButton";
import DashboardHeader from "@/components/general/dashboard/DashboardHeader";
import DashboardTextEditor from "@/components/general/DashboardTextEditor";
import DashboardInput from "@/components/general/DashboardInput";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const AddFaq = () => {
  const { t } = useTranslation("questions");
  const [arBody, setArBody] = React.useState("");
  const [enBody, setEnBody] = React.useState("");
  const [arQuestion, setArQuestion] = useState("");
  const [enQuestion, setEnQuestion] = useState("");
  return (
    <section>
      <DashboardHeader
        titleAr="اضافة سؤال جديد"
        titleEn="Add new question"
        items={[
          { titleAr: "لوحة التحكم", titleEn: "Dashboard", link: "/" },
          { titleAr: "الاعدادات", titleEn: "Settings" },
          { titleAr: "اضافة سؤال جديد", titleEn: "Add new question" },
        ]}
      />
      <div className=" bg-white mt-3 rounded-[15px] py-[19px] px-[29px] mx-8">
        <div className="flex md:flex-row flex-col items-center gap-[15px] mt-4">
          {/* Country */}
          <div className="md:w-1/2 w-full">
            <Select>
              <SelectTrigger
                className="w-full !h-16 rounded-[12px] mt-4"
                dir="rtl"
              >
                <SelectValue placeholder={t("country")} />
              </SelectTrigger>
              <SelectContent dir="rtl">
                <SelectItem value="1">الامارات</SelectItem>
                <SelectItem value="2">الامارات</SelectItem>
                <SelectItem value="3">الامارات</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex md:flex-row flex-col items-center gap-[15px] mt-4">
          {/* Arabic Question */}
          <div className="relative w-full">
            <DashboardInput
              label={t("arQuestion")}
              value={arQuestion}
              onChange={setArQuestion}
              placeholder={t("writeHere")}
            />
          </div>
          {/* English Question */}
          <div className="relative w-full">
            <DashboardInput
              label={t("enQuestion")}
              value={enQuestion}
              onChange={setEnQuestion}
              placeholder={t("writeHere")}
            />
          </div>
        </div>

        <div className="flex md:flex-row flex-col items-center gap-[15px] mt-4">
          {/* Arabic Question */}
          <div className="relative w-full">
            <DashboardTextEditor
              title={t("arQuestion")}
              body={arBody}
              setBody={setArBody}
            />
          </div>
          {/* English Question */}
          <div className="relative w-full">
            <DashboardTextEditor
              title={t("arQuestion")}
              body={enBody}
              setBody={setEnBody}
            />
          </div>
        </div>

        <div className="mt-4">
          <DashboardButton titleAr="اضافة" titleEn="Add" />
        </div>
      </div>
    </section>
  );
};

export default AddFaq;
