export type NICFormat = "OLD" | "NEW" | "UNKNOWN";

export type NICGender = "MALE" | "FEMALE";

export type NICErrorCode =
  | "INVALID_LENGTH"
  | "INVALID_PATTERN"
  | "INVALID_DAY_RANGE"
  | "INVALID_LEAP_DAY"
  | "INVALID_SUFFIX";

export interface ValidationResult {
  valid: boolean;
  reason?: NICErrorCode;
}

export interface NICInfo {
  format: Exclude<NICFormat, "UNKNOWN">;
  birthYear: number;
  dayOfYear: number;
  dateOfBirth: string;
  gender: NICGender;
  serial: string;
  isValid: boolean;
}
