import { DateRangePicker } from "@heroui/date-picker";
import { RangeValue } from "@heroui/react";
import React from "react";
import DateSelectorIcon from "@/components/icons/general/DateSelectorIcon";
import CalenderArrow from "@/components/icons/general/CalenderArrow";
import { CalendarDate } from "@internationalized/date";

interface DashboardDatePickerProps {
  value?: RangeValue<CalendarDate> | null;
  onChange?: (value: RangeValue<CalendarDate> | null) => void;
  isDisabled?: boolean;
  isReadOnly?: boolean;
  className?: string;
}

const DashboardDatePicker = React.memo<DashboardDatePickerProps>(
  ({
    value,
    onChange,
    isDisabled = false,
    isReadOnly = false,
    className = "",
  }) => {
    return (
      <div dir={"ltr"} className={`max-w-fit ${className}`}>
        <DateRangePicker
          variant={"bordered"}
          aria-label="Select date range"
          value={value}
          onChange={onChange}
          isDisabled={isDisabled}
          isReadOnly={isReadOnly}
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
          radius="full"
          isInvalid={false}
          validate={() => true}
          errorMessage=""
        />
      </div>
    );
  }
);

DashboardDatePicker.displayName = "DashboardDatePicker";

export default DashboardDatePicker;
