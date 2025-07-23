import { DateRangePicker } from "@heroui/date-picker";
import React from "react";

const DashboardDatePicker = () => {
  return (
    <div className="max-w-fit ">
      <DateRangePicker
        className="rounded-full border"
        classNames={{
          base: "bg-green-200",
        }}
      />
    </div>
  );
};

export default DashboardDatePicker;
