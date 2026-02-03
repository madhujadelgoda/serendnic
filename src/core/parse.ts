import { NICInfo } from "../types";
import { detectNICFormat } from "./detectFormat";
import { validateNIC } from "./validate";
import { dayOfYearToDate } from "../utils/date";
import { NICError } from "./NICError";

export function parseNIC(nic: string): NICInfo {
  const value = nic.trim();
  const validation = validateNIC(value);
  const format = detectNICFormat(value);

  if (!validation.valid || format === "UNKNOWN") {
    throw new NICError(validation.reason ?? "INVALID_PATTERN");
  }

  return buildNICInfo(value, format);
}

export function parseNICSafe(
  nic: string
):
  | { ok: true; data: NICInfo }
  | { ok: false; error: NICError } {
  try {
    return { ok: true, data: parseNIC(nic) };
  } catch (err) {
    return { ok: false, error: err as NICError };
  }
}

function buildNICInfo(value: string, format: "OLD" | "NEW"): NICInfo {
  let year: number;
  let daySegment: number;
  let serial: string;

  if (format === "NEW") {
    year = Number(value.slice(0, 4));
    daySegment = Number(value.slice(4, 7));
    serial = value.slice(7, 11);
  } else {
    // OLD NIC → always 1900 + YY
    const shortYear = Number(value.slice(0, 2));
    year = 1900 + shortYear;

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
