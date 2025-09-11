import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { RangeValue } from "@heroui/react";
import { CalendarDate } from "@internationalized/date";
import {
  parseURLDateParams,
  isValidDateRange,
  dateRangeToParams,
  DateFilterParams,
} from "@/utils/dateUtils";

export type { DateFilterParams };

export interface UseDatePickerResult {
  dateRange: RangeValue<CalendarDate> | null;
  setDateRange: (range: RangeValue<CalendarDate> | null) => void;
  dateParams: DateFilterParams;
  clearDateRange: () => void;
}

/**
 * Custom hook to manage date picker state with URL synchronization
 * @param paramPrefix Optional prefix for URL parameters (default: none)
 * @returns Object containing date range state and utility functions
 */
export function useDatePicker(paramPrefix = ""): UseDatePickerResult {
  const [searchParams, setSearchParams] = useSearchParams();
  const stateResult = useState<RangeValue<CalendarDate> | null>(null);
  const dateRange = stateResult[0];
  const updateDateRange = stateResult[1];

  const fromDateParam = paramPrefix ? `${paramPrefix}_from_date` : "from_date";
  const toDateParam = paramPrefix ? `${paramPrefix}_to_date` : "to_date";

  // Initialize date range from URL on mount
  useEffect(() => {
    const urlParams = new URLSearchParams();
    const fromDate = searchParams.get(fromDateParam);
    const toDate = searchParams.get(toDateParam);

    if (fromDate) urlParams.set("from_date", fromDate);
    if (toDate) urlParams.set("to_date", toDate);

    const initialDateRange = parseURLDateParams(urlParams);
    if (initialDateRange && isValidDateRange(initialDateRange)) {
      updateDateRange(initialDateRange);
    }
  }, [searchParams, fromDateParam, toDateParam]);

  // Update URL when date range changes
  const setDateRange = useCallback(
    (range: RangeValue<CalendarDate> | null) => {
      updateDateRange(range);

      const newSearchParams = new URLSearchParams(searchParams);

      // Remove existing date parameters
      newSearchParams.delete(fromDateParam);
      newSearchParams.delete(toDateParam);

      // Add new date parameters if range is valid
      if (range && isValidDateRange(range)) {
        const { from_date, to_date } = dateRangeToParams(range);
        if (from_date) newSearchParams.set(fromDateParam, from_date);
        if (to_date) newSearchParams.set(toDateParam, to_date);
      }

      setSearchParams(newSearchParams, { replace: true });
    },
    [searchParams, setSearchParams, fromDateParam, toDateParam]
  );

  // Clear date range
  const clearDateRange = useCallback(() => {
    setDateRange(null);
  }, [setDateRange]);

  // Get date parameters for API calls
  const dateParams: DateFilterParams = dateRangeToParams(dateRange);

  return {
    dateRange,
    setDateRange,
    dateParams,
    clearDateRange,
  };
}
