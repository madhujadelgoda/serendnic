import { detectNICFormat } from "./detectFormat";
import { validateNIC } from "./validate";
import { parseNIC } from "./parse";
import { isLeapYear } from "../utils/date";
import { NICError } from "./NICError";

export interface ExplainedNIC {
  nic: string;
  format: "OLD" | "NEW";

  raw: {
    yearPart: string;
    dayCode: number;
    serial: string;
    suffix?: string;
    sDigit?: string;
  };

  derived: {
    birthYear: number;
    isLeapYear: boolean;
    gender: "MALE" | "FEMALE";
    genderOffsetApplied: boolean;
    dayOfYear: number;
    dateOfBirth: string;
    month: number;
    day: number;
  };
}

export function explainNIC(nic: string): ExplainedNIC {
  const value = nic.trim();

  const validation = validateNIC(value);
  const format = detectNICFormat(value);

  if (!validation.valid || format === "UNKNOWN") {
    throw new NICError(validation.reason ?? "INVALID_PATTERN");
  }

  const parsed = parseNIC(value);

  let yearPart: string;
  let serial: string;
  let suffix: string | undefined;
  let sDigit: string | undefined;

  if (format === "NEW") {
    yearPart = value.slice(0, 4);
    serial = value.slice(8, 12);
    sDigit = value[7];
  } else {
    yearPart = value.slice(0, 2);
    serial = value.slice(5, 9);
    suffix = value[value.length - 1];
  }

  const leap = isLeapYear(parsed.birthYear);

  const [, mm, dd] = parsed.dateOfBirth.split("-");

  return {
    nic: value,
    format,

    raw: {
      yearPart,
      dayCode: parsed.dayOfYear,
      serial,
      suffix,
      sDigit
    },

    derived: {
      birthYear: parsed.birthYear,
      isLeapYear: leap,
      gender: parsed.gender,
      genderOffsetApplied: parsed.gender === "FEMALE",
      dayOfYear: parsed.dayOfYear,
      dateOfBirth: parsed.dateOfBirth,
      month: Number(mm),
      day: Number(dd)
    }
  };
}
