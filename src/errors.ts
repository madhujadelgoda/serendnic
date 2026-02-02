import { NICErrorCode } from "./types";

export const ERROR_MESSAGES: Record<NICErrorCode, string> = {
  INVALID_LENGTH: "NIC has an invalid length",
  INVALID_PATTERN: "NIC does not match expected format",
  INVALID_DAY_RANGE: "Day-of-year is out of valid range",
  INVALID_LEAP_DAY: "Day-of-year is invalid for non-leap year",
  INVALID_SUFFIX: "Old NIC must end with V or X"
};
