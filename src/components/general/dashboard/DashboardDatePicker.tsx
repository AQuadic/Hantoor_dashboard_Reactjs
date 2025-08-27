import { DateRangePicker } from "@heroui/date-picker";
import React from "react";
import DateSelectorIcon from "@/components/icons/general/DateSelectorIcon";
import CalenderArrow from "@/components/icons/general/CalenderArrow";

const DashboardDatePicker = React.memo(() => {
  return (
    <div dir={"ltr"} className="max-w-fit ">
      <DateRangePicker
        variant={"bordered"}
        aria-label="Select date range"
        startContent={
          <span className="pl-3 flex items-center">
            <CalenderArrow />
          </span>
        }
        selectorIcon={
          <span className="pl-10">
            <DateSelectorIcon />
          </span>
        }
        className=""
        radius="full"
        isInvalid={false}
        validate={() => true}
        errorMessage=""
      />
    </div>
  );
});

DashboardDatePicker.displayName = "DashboardDatePicker";

export default DashboardDatePicker;
