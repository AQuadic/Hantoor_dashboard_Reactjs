import { DateRangePicker } from "@heroui/date-picker";
import React from "react";
import DateSelectorIcon from "@/components/icons/general/DateSelectorIcon";

const DashboardDatePicker = () => {
  return (
    <div dir={"ltr"} className="max-w-fit ">
      <DateRangePicker
        variant={"bordered"}
        selectorIcon={
          <span className="pl-10">
            <DateSelectorIcon />
          </span>
        }
        className=""
        radius="full"
      />
    </div>
  );
};

export default DashboardDatePicker;
