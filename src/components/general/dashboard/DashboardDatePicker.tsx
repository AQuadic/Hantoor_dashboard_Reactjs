import { DateRangePicker } from "@heroui/date-picker";
import React from "react";
import DateSelectorIcon from "@/components/icons/general/DateSelectorIcon";

const DashboardDatePicker = () => {
  return (
    <div dir="ltr" className="max-w-fit ">
      <DateRangePicker
        selectorIcon={<DateSelectorIcon />}
        className="rounded-full border bg-pink-200"
      />
    </div>
  );
};

export default DashboardDatePicker;
