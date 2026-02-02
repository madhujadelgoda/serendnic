import { ValidationResult } from "../types";
import { detectNICFormat } from "./detectFormat";
import { isLeapYear } from "../utils/date";

export function validateNIC(nic: string): ValidationResult {
  const value = nic.trim();
  const format = detectNICFormat(value);

  if (format === "UNKNOWN") {
    return { valid: false, reason: "INVALID_PATTERN" };
  }

  let year: number;
  let daySegment: number;

  if (format === "NEW") {
    year = Number(value.slice(0, 4));
    daySegment = Number(value.slice(4, 7));
  } else {
    const shortYear = Number(value.slice(0, 2));
    year = shortYear <= 30 ? 2000 + shortYear : 1900 + shortYear;
    daySegment = Number(value.slice(2, 5));

    const suffix = value[value.length - 1].toUpperCase();
    if (suffix !== "V" && suffix !== "X") {
      return { valid: false, reason: "INVALID_SUFFIX" };
    }
  }

  const isFemale = daySegment > 500;
  const day = isFemale ? daySegment - 500 : daySegment;

  if (day < 1 || day > 366) {
    return { valid: false, reason: "INVALID_DAY_RANGE" };
  }

  if (day === 366 && !isLeapYear(year)) {
    return { valid: false, reason: "INVALID_LEAP_DAY" };
  }

  return { valid: true };
}
