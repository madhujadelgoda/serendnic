import { NICInfo } from "../types";
import { detectNICFormat } from "./detectFormat";
import { validateNIC } from "./validate";
import { dayOfYearToDate } from "../utils/date";

export function parseNIC(nic: string): NICInfo {
  const value = nic.trim();
  const validation = validateNIC(value);
  const format = detectNICFormat(value);

  if (!validation.valid || format === "UNKNOWN") {
    throw new Error("Invalid NIC number");
  }

  let year: number;
  let daySegment: number;
  let serial: string;

  if (format === "NEW") {
    year = Number(value.slice(0, 4));
    daySegment = Number(value.slice(4, 7));
    serial = value.slice(7, 11);
  } else {
    const shortYear = Number(value.slice(0, 2));
    year = shortYear <= 30 ? 2000 + shortYear : 1900 + shortYear;
    daySegment = Number(value.slice(2, 5));
    serial = value.slice(5, 9);
  }

  const isFemale = daySegment > 500;
  const day = isFemale ? daySegment - 500 : daySegment;

  return {
    format,
    birthYear: year,
    dayOfYear: day,
    dateOfBirth: dayOfYearToDate(year, day),
    gender: isFemale ? "FEMALE" : "MALE",
    serial,
    isValid: true
  };
}
