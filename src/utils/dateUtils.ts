import { RangeValue } from "@heroui/react";
import {
  CalendarDate,
  parseDate,
  today,
  getLocalTimeZone,
} from "@internationalized/date";

export interface DateFilterParams {
  from_date?: string;
  to_date?: string;
}

/**
 * Converts a CalendarDate to YYYY-MM-DD format string for API calls
 */
export function formatDateForAPI(date: CalendarDate): string {
  return date.toString(); // CalendarDate.toString() returns YYYY-MM-DD format
}

/**
 * Converts a date range value to API format parameters
 */
export function dateRangeToParams(
  dateRange: RangeValue<CalendarDate> | null
): DateFilterParams {
  if (!dateRange?.start || !dateRange?.end) {
    return {};
  }

  return {
    from_date: formatDateForAPI(dateRange.start),
    to_date: formatDateForAPI(dateRange.end),
  };
}

/**
 * Parses date parameters from URL search params to CalendarDate range
 */
export function parseURLDateParams(
  searchParams: URLSearchParams
): RangeValue<CalendarDate> | null {
  const fromDate = searchParams.get("from_date");
  const toDate = searchParams.get("to_date");

  if (!fromDate || !toDate) {
    return null;
  }

  try {
    return {
      start: parseDate(fromDate),
      end: parseDate(toDate),
    };
  } catch (error) {
    console.warn("Invalid date format in URL parameters:", error);
    return null;
  }
}

/**
 * Updates URL search params with date range values
 */
export function updateURLWithDateRange(
  searchParams: URLSearchParams,
  dateRange: RangeValue<CalendarDate> | null
): URLSearchParams {
  const newParams = new URLSearchParams(searchParams);

  // Remove existing date parameters
  newParams.delete("from_date");
  newParams.delete("to_date");

  // Add new date parameters if range is provided
  if (dateRange?.start && dateRange?.end) {
    newParams.set("from_date", formatDateForAPI(dateRange.start));
    newParams.set("to_date", formatDateForAPI(dateRange.end));
  }

  return newParams;
}

/**
 * Creates a default date range (last 30 days)
 */
export function getDefaultDateRange(): RangeValue<CalendarDate> {
  const endDate = today(getLocalTimeZone());
  const startDate = endDate.subtract({ days: 30 });

  return {
    start: startDate,
    end: endDate,
  };
}

/**
 * Validates if a date range is valid
 */
export function isValidDateRange(
  dateRange: RangeValue<CalendarDate> | null
): boolean {
  if (!dateRange?.start || !dateRange?.end) {
    return false;
  }

  return dateRange.start.compare(dateRange.end) <= 0;
}
