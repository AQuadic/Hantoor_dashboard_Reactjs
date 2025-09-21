import { DateRangePicker } from "@heroui/date-picker";
import { RangeValue } from "@heroui/react";
import React from "react";
import { useTranslation } from "react-i18next";
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
    const { i18n } = useTranslation();
    const isRTL = i18n.language === "ar";

    const hasRange = Boolean(value?.start && value?.end);

    const handleClear = () => {
      if (isDisabled || isReadOnly) return;
      onChange?.(null);
    };
    return (
      <div dir={"ltr"} className={`max-w-fit ${className}`}>
        <div className="relative">
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

          {hasRange ? (
            <button
              type="button"
              aria-label="Clear date range"
              onClick={handleClear}
              disabled={isDisabled || isReadOnly}
              className={
                `absolute top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-8 h-8 rounded-full bg-white border border-[rgba(0,0,0,0.06)] shadow-sm transition-colors focus:outline-none hover:bg-[var(--primary)] hover:text-white text-[var(--primary)]` +
                ` ${isRTL ? "left-2" : "right-2"}`
              }
              style={{
                // ensure the button doesn't affect input direction/layout
                direction: "ltr",
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden
                focusable="false"
                className="pointer-events-none"
              >
                <path
                  d="M18 6L6 18M6 6l12 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          ) : null}
        </div>
      </div>
    );
  }
);

DashboardDatePicker.displayName = "DashboardDatePicker";

export default DashboardDatePicker;
